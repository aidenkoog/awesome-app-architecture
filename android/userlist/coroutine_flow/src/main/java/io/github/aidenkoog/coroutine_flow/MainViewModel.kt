package io.github.aidenkoog.coroutine_flow

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.hoc081098.flowext.interval
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.FlowPreview
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import kotlin.time.Duration.Companion.seconds

@FlowPreview
@ExperimentalCoroutinesApi
class MainViewModel : ViewModel() {
    private val actionSharedFlow = MutableSharedFlow<Action>()

    val stateFlow: StateFlow<StopWatchState> by selfReferenced {
        val initialState = StopWatchState()

        actionSharedFlow.flatMapLatest { action ->
            when (action) {
                Action.START -> {
                    tickerFlow(stateFlow.value.seconds).map {
                        StopWatchState(
                            seconds = it, watchState = StopWatchState.WatchState.RUNNING
                        )
                    }.onCompletion { if (it == null) emitAll(flowOf(initialState)) }
                }
                Action.PAUSE -> {
                    flowOf(
                        StopWatchState(
                            watchState = StopWatchState.WatchState.PAUSED,
                            seconds = stateFlow.value.seconds
                        )
                    )
                }
                Action.CLEAR -> flowOf(initialState)
            }
        }.onEach { Log.d("debug", "state: $it") }.catch { Log.d("debug", "exception: $it") }
            .stateIn(
                viewModelScope, SharingStarted.Eagerly, initialState
            )
    }

    fun process(action: Action) = viewModelScope.launch { actionSharedFlow.emit(action) }.let { }

    private companion object {
        const val MAX_SECONDS = 10
        private fun tickerFlow(resume: Long): Flow<Long> =
            interval(initialDelay = 1.seconds, period = 1.seconds).map { it + 1 + resume }
                .takeWhile { it <= MAX_SECONDS }
    }
}