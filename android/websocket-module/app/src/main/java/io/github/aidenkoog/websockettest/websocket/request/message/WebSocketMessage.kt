package io.github.aidenkoog.websockettest.websocket.request.message

import com.google.gson.annotations.SerializedName

data class WebSocketMessage(
    val event: String,
    val data: Request,
) {
    data class Request(
        val cmd: String,
        @SerializedName("feature_id") val featureId: String,
        val extra: Any,
        val res: String,
    )
}

data class WebSocketConnectionMessage(
    val event: String, val data: Data,
) {
    data class Data(
        val featureId: String,
    )
}