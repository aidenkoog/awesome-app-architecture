package io.github.aidenkoog.android_wear_os.presentation.home.fragment.health_service

import android.content.res.ColorStateList
import android.graphics.Color
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.viewModels
import androidx.health.services.client.data.DataPointContainer
import androidx.health.services.client.data.DataType
import androidx.health.services.client.data.ExerciseState
import androidx.health.services.client.data.ExerciseUpdate
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.wear.ambient.AmbientModeSupport
import com.orhanobut.logger.Logger
import dagger.hilt.android.AndroidEntryPoint
import io.github.aidenkoog.android_wear_os.BR
import io.github.aidenkoog.android_wear_os.R
import io.github.aidenkoog.android_wear_os.data.repositories.HealthServicesManager
import io.github.aidenkoog.android_wear_os.databinding.FragmentHealthServiceExerciseBinding
import io.github.aidenkoog.android_wear_os.presentation.base.fragment.BaseFragment
import io.github.aidenkoog.android_wear_os.presentation.home.viewmodel.health_service.AmbientEvent
import io.github.aidenkoog.android_wear_os.presentation.home.viewmodel.health_service.HealthServiceViewModel
import io.github.aidenkoog.android_wear_os.services.ExerciseService
import io.github.aidenkoog.android_wear_os.services.ExerciseServiceConnection
import io.github.aidenkoog.android_wear_os.services.displayDuration
import io.github.aidenkoog.android_wear_os.utils.utils.NavigationUtil
import io.github.aidenkoog.android_wear_os.utils.utils.formatCalories
import io.github.aidenkoog.android_wear_os.utils.utils.formatDistanceKm
import io.github.aidenkoog.android_wear_os.utils.utils.formatElapsedTime
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.time.Duration
import java.time.Instant
import javax.inject.Inject
import kotlin.math.roundToInt

@AndroidEntryPoint
class HealthServiceExerciseFragment : BaseFragment() {
    private var viewDataBinding: FragmentHealthServiceExerciseBinding? = null
    private val viewModelData: HealthServiceViewModel? by viewModels()

    @Inject
    lateinit var healthServicesManager: HealthServicesManager

    private var serviceConnection = ExerciseServiceConnection()

    private var cachedExerciseState = ExerciseState.ENDED
    private var activeDurationCheckpoint =
        ExerciseUpdate.ActiveDurationCheckpoint(Instant.now(), Duration.ZERO)
    private var chronoTickJob: Job? = null
    private var uiBindingJob: Job? = null

    private lateinit var ambientController: AmbientModeSupport.AmbientController
    private lateinit var ambientModeHandler: AmbientModeHandler

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setDataObserver()
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View? {
        viewDataBinding = FragmentHealthServiceExerciseBinding.inflate(inflater, container, false)
        viewDataBinding?.setVariable(BR.healthServiceViewModel, viewModelData)
        viewDataBinding?.executePendingBindings()

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

        viewDataBinding?.startEndButton?.setOnClickListener {
            // App could take a perceptible amount of time to transition between states; put button into
            // an intermediary "disabled" state to provide UI feedback.
            it.isEnabled = false
            startEndExercise()
        }
        viewDataBinding?.pauseResumeButton?.setOnClickListener {
            // App could take a perceptible amount of time to transition between states; put button into
            // an intermediary "disabled" state to provide UI feedback.
            it.isEnabled = false
            pauseResumeExercise()
        }

        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                val capabilities =
                    healthServicesManager.getExerciseCapabilities() ?: return@repeatOnLifecycle
                val supportedTypes = capabilities.supportedDataTypes

                // Set enabled state for relevant text elements.
                viewDataBinding?.heartRateText?.isEnabled =
                    DataType.HEART_RATE_BPM in supportedTypes
                viewDataBinding?.caloriesText?.isEnabled = DataType.CALORIES_TOTAL in supportedTypes
                viewDataBinding?.distanceText?.isEnabled = DataType.DISTANCE in supportedTypes
                viewDataBinding?.lapsText?.isEnabled = true
            }
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModelData?.keyPressFlow?.collect {
                    healthServicesManager.markLap()
                }
            }
        }

        // Ambient Mode
        ambientModeHandler = AmbientModeHandler()
        ambientController = AmbientModeSupport.attach(requireActivity())
        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModelData?.ambientEventFlow?.collect {
                    ambientModeHandler.onAmbientEvent(it)
                }
            }
        }

        // Bind to our service. Views will only update once we are connected to it.
        ExerciseService.bindService(requireContext().applicationContext, serviceConnection)
        bindViewsToService()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        // Unbind from the service.
        ExerciseService.unbindService(requireContext().applicationContext, serviceConnection)
    }

    private fun startEndExercise() {
        if (cachedExerciseState.isEnded) {
            tryStartExercise()
        } else {
            checkNotNull(serviceConnection.exerciseService) {
                "Failed to achieve ExerciseService instance"
            }.endExercise()
        }
    }

    private fun tryStartExercise() {
        viewLifecycleOwner.lifecycleScope.launch {
            if (healthServicesManager.isTrackingExerciseInAnotherApp()) {
                // Show the user a confirmation screen.
//                findNavController().navigate(R.id.to_newExerciseConfirmation)
            } else if (!healthServicesManager.isExerciseInProgress()) {
                checkNotNull(serviceConnection.exerciseService) {
                    "Failed to achieve ExerciseService instance"
                }.startExercise()
            }
        }
    }

    private fun pauseResumeExercise() {
        val service = checkNotNull(serviceConnection.exerciseService) {
            "Failed to achieve ExerciseService instance"
        }
        if (cachedExerciseState.isPaused) {
            service.resumeExercise()
        } else {
            service.pauseExercise()
        }
    }

    private fun bindViewsToService() {
        if (uiBindingJob != null) return

        uiBindingJob = viewLifecycleOwner.lifecycleScope.launch {
            serviceConnection.repeatWhenConnected { service ->
                // Use separate launch blocks because each .collect executes indefinitely.
                launch {
                    service.exerciseState.collect {
                        updateExerciseStatus(it)
                    }
                }
                launch {
                    service.latestMetrics.collect {
                        it?.let { updateMetrics(it) }
                    }
                }
                launch {
                    service.exerciseLaps.collect {
                        updateLaps(it)
                    }
                }
                launch {
                    service.activeDurationCheckpoint.collect {
                        // We don't update the chronometer here since these updates come at irregular
                        // intervals. Instead we store the duration and update the chronometer with
                        // our own regularly-timed intervals.
                        activeDurationCheckpoint = it
                    }
                }
            }
        }
    }

    private fun unbindViewsFromService() {
        uiBindingJob?.cancel()
        uiBindingJob = null
    }

    private fun updateExerciseStatus(state: ExerciseState) {
        val previousStatus = cachedExerciseState
        if (previousStatus.isEnded && !state.isEnded) {
            // We're starting a new exercise. Clear metrics from any prior exercise.
            resetDisplayedFields()
        }

        if (state == ExerciseState.ACTIVE && !ambientController.isAmbient) {
            startChronometer()
        } else {
            stopChronometer()
        }

        updateButtons(state)
        cachedExerciseState = state
    }

    private fun updateButtons(state: ExerciseState) {
        viewDataBinding?.startEndButton?.setText(
            if (state.isEnded) R.string.start else R.string.end
        )
        viewDataBinding?.startEndButton?.isEnabled = true
        viewDataBinding?.pauseResumeButton?.setText(
            if (state.isPaused) R.string.resume else R.string.pause
        )
        viewDataBinding?.pauseResumeButton?.isEnabled = !state.isEnded
    }

    private fun updateMetrics(latestMetrics: DataPointContainer) {
        latestMetrics.getData(DataType.HEART_RATE_BPM).let {
            if (it.isNotEmpty()) {
                viewDataBinding?.heartRateText?.text = it.last().value.roundToInt().toString()
            }
        }
        latestMetrics.getData(DataType.DISTANCE_TOTAL)?.let {
            viewDataBinding?.distanceText?.text = formatDistanceKm(it.total)
        }
        latestMetrics.getData(DataType.CALORIES_TOTAL)?.let {
            viewDataBinding?.caloriesText?.text = formatCalories(it.total)
        }
    }

    private fun updateLaps(laps: Int) {
        viewDataBinding?.lapsText?.text = laps.toString()
    }

    private fun startChronometer() {
        if (chronoTickJob == null) {
            chronoTickJob = viewLifecycleOwner.lifecycleScope.launch {
                viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                    while (true) {
                        delay(CHRONO_TICK_MS)
                        updateChronometer()
                    }
                }
            }
        }
    }

    private fun stopChronometer() {
        chronoTickJob?.cancel()
        chronoTickJob = null
    }

    private fun updateChronometer() {
        // We update the chronometer on our own regular intervals independent of the exercise
        // duration value received. If the exercise is still active, add the difference between
        // the last duration update and now.
        val duration = activeDurationCheckpoint.displayDuration(Instant.now(), cachedExerciseState)
        viewDataBinding?.elapsedTime?.text =
            formatElapsedTime(duration, !ambientController.isAmbient)
    }

    private fun resetDisplayedFields() {
        getString(R.string.empty_metric).let {
            viewDataBinding?.heartRateText?.text = it
            viewDataBinding?.caloriesText?.text = it
            viewDataBinding?.distanceText?.text = it
            viewDataBinding?.lapsText?.text = it
        }
        viewDataBinding?.elapsedTime?.text = formatElapsedTime(Duration.ZERO, true)
    }

    // -- Ambient Mode support

    private fun setAmbientUiState(isAmbient: Boolean) {
        // Change icons to white while in ambient mode.
        val iconTint = if (isAmbient) {
            Color.WHITE
        } else {
            resources.getColor(R.color.purple_500, null)
        }
        ColorStateList.valueOf(iconTint).let {
            viewDataBinding?.clockIcon?.imageTintList = it
            viewDataBinding?.heartRateIcon?.imageTintList = it
            viewDataBinding?.caloriesIcon?.imageTintList = it
            viewDataBinding?.distanceIcon?.imageTintList = it
            viewDataBinding?.lapsIcon?.imageTintList = it
        }

        // Hide the buttons in ambient mode.
        val buttonVisibility = if (isAmbient) View.INVISIBLE else View.VISIBLE
        buttonVisibility.let {
            viewDataBinding?.startEndButton?.visibility = it
            viewDataBinding?.pauseResumeButton?.visibility = it
        }
    }

    private fun performOneTimeUiUpdate() {
        val service = checkNotNull(serviceConnection.exerciseService) {
            "Failed to achieve ExerciseService instance"
        }
        updateExerciseStatus(service.exerciseState.value)
        updateLaps(service.exerciseLaps.value)

        service.latestMetrics.value?.let { updateMetrics(it) }

        activeDurationCheckpoint = service.activeDurationCheckpoint.value
        updateChronometer()
    }

    inner class AmbientModeHandler {
        internal fun onAmbientEvent(event: AmbientEvent) {
            when (event) {
                is AmbientEvent.Enter -> onEnterAmbient()
                is AmbientEvent.Exit -> onExitAmbient()
                is AmbientEvent.Update -> onUpdateAmbient()
            }
        }

        private fun onEnterAmbient() {
            // Note: Apps should also handle low-bit ambient and burn-in protection.
            unbindViewsFromService()
            setAmbientUiState(true)
            performOneTimeUiUpdate()
        }

        private fun onExitAmbient() {
            performOneTimeUiUpdate()
            setAmbientUiState(false)
            bindViewsToService()
        }

        private fun onUpdateAmbient() {
            performOneTimeUiUpdate()
        }
    }

    private companion object {
        const val CHRONO_TICK_MS = 200L
    }

    private fun setDataObserver() {
        viewModelData?.isLoaded?.observe(this) {
            if (it == true) {
                Logger.i("Loaded!")
            }
        }
    }
}