package io.github.aidenkoog.websockettest.new_websocket

import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.emptyFlow

/**
 * inherits the socket class I defined
 */
class SocketHandler : WebSocket {

    /**
     * okhttp websocket. it's not my websocket.
     */
    private var socket: okhttp3.WebSocket? = null

    fun initWebSocket(socket: okhttp3.WebSocket) {
        this.socket = socket
    }

    /**
     * emptyFlow is similar to emptyList, and nothing happens when you call collect.
     */
    override fun open(): Flow<WebSocketEvent> {
        return emptyFlow()
    }

    override fun send(data: String): Boolean {
        return socket?.send(data) ?: false
    }

    override fun close(code: Int, reason: String): Boolean {
        return socket?.close(code, reason).apply { socket = null } ?: false
    }

    override fun cancel() {
        socket?.cancel()
        socket = null
    }
}