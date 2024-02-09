package io.github.aidenkoog.websockettest.new_websocket

sealed class WebSocketEvent {
    data class OnConnectionOpen(
        val webSocket: Any
    ) : WebSocketEvent()

    data class OnMessageReceived(
        val data: String
    ) : WebSocketEvent()

    data class OnConnectionError(
        val error: String?
    ) : WebSocketEvent()

    data object OnConnectionClosed : WebSocketEvent()
}