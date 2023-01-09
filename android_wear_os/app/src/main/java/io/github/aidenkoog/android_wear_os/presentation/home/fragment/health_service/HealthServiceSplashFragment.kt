package io.github.aidenkoog.android_wear_os.presentation.home.fragment.health_service

import android.animation.Animator
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.viewModels
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import com.airbnb.lottie.LottieAnimationView
import com.orhanobut.logger.Logger
import dagger.hilt.android.AndroidEntryPoint
import io.github.aidenkoog.android_wear_os.BR
import io.github.aidenkoog.android_wear_os.R
import io.github.aidenkoog.android_wear_os.data.repositories.HealthServicesManager
import io.github.aidenkoog.android_wear_os.databinding.FragmentHealthServiceSplashBinding
import io.github.aidenkoog.android_wear_os.presentation.base.fragment.BaseFragment
import io.github.aidenkoog.android_wear_os.presentation.home.viewmodel.health_service.HealthServiceViewModel
import io.github.aidenkoog.android_wear_os.utils.utils.LottieUtil
import io.github.aidenkoog.android_wear_os.utils.utils.NavigationUtil
import kotlinx.coroutines.launch
import javax.inject.Inject

@AndroidEntryPoint
class HealthServiceSplashFragment : BaseFragment() {
    private var viewDataBinding: FragmentHealthServiceSplashBinding? = null
    private val viewModelData: HealthServiceViewModel? by viewModels()

    private lateinit var loadingLottieView: LottieAnimationView

    @Inject
    lateinit var healthServicesManager: HealthServicesManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setDataObserver()
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View? {
        viewDataBinding = FragmentHealthServiceSplashBinding.inflate(inflater, container, false)
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
    }

    private fun startLottieAnimation() {
        LottieUtil.setLottieRawResource(loadingLottieView, R.raw.setting_loading)
        LottieUtil.setLottieSpeed(loadingLottieView, 1.2f)
        LottieUtil.addLottieAnimatorListener(loadingLottieView, lottieAnimationCallback)
        LottieUtil.playLottie(loadingLottieView, 1500)
    }

    private val lottieAnimationCallback = object : LottieUtil.LottieAnimatorListener {
        override fun onAnimationStart(animator: Animator?) {
            Logger.i("Started animation")
        }

        override fun onAnimationEnd(animator: Animator?) {
            Logger.i("End animation")
            viewLifecycleOwner.lifecycleScope.launch {
                viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                    val action = if (healthServicesManager.hasExerciseCapability()) {
                        R.id.action_healthServiceSplashFragment_to_healthServicePrepareFragment
                    } else {
                        R.id.action_healthServiceSplashFragment_to_healthServiceNotAvailableFragment
                    }
                    NavigationUtil.navigateScreen(getView(), action)
                }
            }
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