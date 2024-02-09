package io.github.aidenkoog.websockettest.new_websocket

import kotlinx.coroutines.flow.Flow

interface EventCollector {
    fun collectEvent(): Flow<WebSocketEvent>
}