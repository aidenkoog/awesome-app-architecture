package io.github.aidenkoog.websockettest.new_websocket

import kotlinx.coroutines.flow.Flow

interface WebSocket {
    fun open(): Flow<WebSocketEvent>

    fun send(data: String): Boolean

    fun close(code: Int, reason: String): Boolean

    fun cancel()

    interface Factory {
        fun create(): WebSocket
    }
}