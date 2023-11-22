package io.github.aidenkoog.coroutine_flow

data class StopWatchState(
    val watchState: WatchState = WatchState.IDLE,
    val seconds: Long = 0
) {
    enum class WatchState {
        RUNNING,
        PAUSED,
        IDLE
    }
}
