package io.github.aidenkoog.eventbus

import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.filter
import kotlinx.coroutines.launch

class RefreshEventBus {
    private val events = MutableSharedFlow<GlobalRefreshEvent>()

    @OptIn(DelicateCoroutinesApi::class)
    fun produceEvent(event: GlobalRefreshEvent) {
        GlobalScope.launch {
            events.emit(event)
        }
    }

    suspend fun subscribeEvent(globalRefreshEvent: GlobalRefreshEvent, onEvent: () -> Unit) {
        events.filter { it == globalRefreshEvent}.collect {
            onEvent()
        }
    }
}

enum class GlobalRefreshEvent {
    LikedPostingChangedEvent,
    UploadPostingEvent
}