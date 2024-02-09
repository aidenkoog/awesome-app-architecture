package io.github.aidenkoog.eventbus

import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.filter
import kotlinx.coroutines.flow.map

object EventBus {
    /**
     * replay
     * set data count to be delivered when collector is connected.
     * 0: data received after collect.
     * 1: data received just before collect.
     */
    private val events = MutableSharedFlow<Any>(replay = 0)
    val mutableEvents = events.asSharedFlow()

    suspend fun post(event: Any) {
        events.emit(event)
    }

    inline fun <reified T> subscribe(): Flow<T> {
        return mutableEvents.filter {it is T}.map {it as T}
    }
}