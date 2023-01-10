package io.github.aidenkoog.android_wear_os.presentation.home.fragment.health_service

import android.Manifest
import android.animation.Animator
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.result.contract.ActivityResultContracts
import androidx.fragment.app.viewModels
import androidx.health.services.client.data.LocationAvailability
import androidx.lifecycle.lifecycleScope
import androidx.navigation.findNavController
import com.airbnb.lottie.LottieAnimationView
import com.orhanobut.logger.Logger
import dagger.hilt.android.AndroidEntryPoint
import io.github.aidenkoog.android_wear_os.BR
import io.github.aidenkoog.android_wear_os.R
import io.github.aidenkoog.android_wear_os.databinding.FragmentHealthServicePreparingBinding
import io.github.aidenkoog.android_wear_os.presentation.base.fragment.BaseFragment
import io.github.aidenkoog.android_wear_os.presentation.home.viewmodel.health_service.HealthServiceViewModel
import io.github.aidenkoog.android_wear_os.services.health_service.ExerciseService
import io.github.aidenkoog.android_wear_os.services.health_service.ExerciseServiceConnection
import io.github.aidenkoog.android_wear_os.utils.utils.LottieUtil
import io.github.aidenkoog.android_wear_os.utils.utils.NavigationUtil
import kotlinx.coroutines.launch

@AndroidEntryPoint
class HealthServicePrepareFragment : BaseFragment() {
    private var viewDataBinding: FragmentHealthServicePreparingBinding? = null
    private val viewModelData: HealthServiceViewModel? by viewModels()

    private var serviceConnection = ExerciseServiceConnection()
    private lateinit var loadingLottieView: LottieAnimationView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setDataObserver()
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View? {
        viewDataBinding = FragmentHealthServicePreparingBinding.inflate(inflater, container, false)
        viewDataBinding?.setVariable(BR.healthServiceViewModel, viewModelData)
        viewDataBinding?.executePendingBindings()
        loadingLottieView = viewDataBinding?.loadingLottieView!!

        registerBackPressedCallback()
        return viewDataBinding?.root!!
    }

    override fun onHandleBackPressed() {
        super.onHandleBackPressed()
        handleBackPress()
    }

    private fun handleBackPress() {
        NavigationUtil.popBackStack(view)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Logger.d("onViewCreated:")

        startLottieAnimation()

        // Bind to our service. Views will only update once we are connected to it.
        ExerciseService.bindService(requireContext().applicationContext, serviceConnection)
        bindViewsToService()

        viewDataBinding?.startButton?.setOnClickListener {
            checkNotNull(serviceConnection.exerciseService) {
                "Failed to achieve ExerciseService instance"
            }.startExercise()
            view.findNavController().navigate(R.id.healthServiceExerciseFragment)
        }
        // Check permissions first.
        Logger.d("Checking permissions")
        permissionLauncher.launch(REQUIRED_PERMISSIONS)
    }

    private val permissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { result ->
        if (result.all { it.value }) {
            Logger.i("All required permissions granted")

            viewLifecycleOwner.lifecycleScope.launch {
                // Await binding of ExerciseService, since it takes a bit of time
                // to instantiate the service.
                serviceConnection.repeatWhenConnected {
                    checkNotNull(serviceConnection.exerciseService) {
                        "Failed to achieve ExerciseService instance"
                    }.prepareExercise()
                }
            }
        } else {
            Logger.w("Not all required permissions granted")
        }
    }

    private fun bindViewsToService() {
        viewLifecycleOwner.lifecycleScope.launch {
            serviceConnection.repeatWhenConnected { service ->
                service.locationAvailabilityState.collect {
                    updatePrepareLocationStatus(it)
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        // Unbind from the service.
        ExerciseService.unbindService(requireContext().applicationContext, serviceConnection)
    }

    private fun updatePrepareLocationStatus(locationAvailability: LocationAvailability) {
        Logger.i("LocationAvailabiliy Name: " + locationAvailability.name)
        val gpsText = when (locationAvailability) {
            LocationAvailability.ACQUIRED_TETHERED,
            LocationAvailability.ACQUIRED_UNTETHERED -> "acquired"
            LocationAvailability.NO_GNSS -> "gps disabled"
            LocationAvailability.ACQUIRING -> "acquiring"
            else -> "gps unavailable"
        }
        viewDataBinding?.gpsStatus?.text = gpsText

        if (locationAvailability != LocationAvailability.ACQUIRING) {
            //
        }
    }

    private companion object {
        val REQUIRED_PERMISSIONS = arrayOf(
            Manifest.permission.BODY_SENSORS,
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACTIVITY_RECOGNITION
        )
    }

    private fun startLottieAnimation() {
        LottieUtil.setLottieRawResource(loadingLottieView, R.raw.setting_loading)
        LottieUtil.setLottieSpeed(loadingLottieView, 1.2f)
        LottieUtil.addLottieAnimatorListener(loadingLottieView, lottieAnimationCallback)
        LottieUtil.playLottie(loadingLottieView)
    }

    private val lottieAnimationCallback = object : LottieUtil.LottieAnimatorListener {
        override fun onAnimationStart(animator: Animator?) {
            Logger.i("Started animation")
        }

        override fun onAnimationEnd(animator: Animator?) {
            Logger.i("End animation")
        }

        override fun onAnimationCancel(animator: Animator?) {
            Logger.i("Canceled animation")
        }

        override fun onAnimationRepeat(animator: Animator?) {
            Logger.i("Repeated animation")
        }
    }

    private fun setDataObserver() {
        viewModelData?.isLoaded?.observe(this) {
            if (it == true) {
                Logger.i("Loaded!")
            }
        }
    }
}