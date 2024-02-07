package io.github.aidenkoog.websockettest.websocket

import android.util.Log
import com.google.gson.Gson
import io.github.aidenkoog.websockettest.websocket.listener.WebSocketResultListener
import io.github.aidenkoog.websockettest.websocket.request.message.WebSocketConnectionMessage
import io.github.aidenkoog.websockettest.websocket.request.message.WebSocketMessage
import java.util.concurrent.TimeUnit
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import okhttp3.WebSocket
import okhttp3.WebSocketListener
import okio.ByteString

object WebSocketManager {
    private const val TAG = "WebSocketManager"

    private const val MAX_NUM = 5
    private const val RECONNECTION_INTERVAL_TIME = 5000

    private var okHttpClient: OkHttpClient? = null
    private var okHttpRequest: Request? = null

    private var resultListener: WebSocketResultListener? = null
    private var webSocketClient: WebSocket? = null

    private var isConnected = false
    private var reconnectionCount = 0

    /* external open. */
    @JvmStatic
    fun precondition(webSocketRequest: Request, listener: WebSocketResultListener) {
        Log.d(TAG, "precondition: ")

        okHttpClient = OkHttpClient.Builder().writeTimeout(5, TimeUnit.SECONDS)
            .readTimeout(5, TimeUnit.SECONDS).connectTimeout(10, TimeUnit.SECONDS).build()

        okHttpRequest = webSocketRequest
        resultListener = listener
    }

    /* external open. */
    @JvmStatic
    fun addWebSocketResultListener(listener: WebSocketResultListener) {
        resultListener = listener
    }

    /* external open. */
    @JvmStatic
    fun connect() {
        okHttpClient?.let {
            createWebSocket(it)
        }
    }

    /* external open. */
    @JvmStatic
    fun close() {
        if (isConnected) {
            webSocketClient?.cancel()
            webSocketClient?.close(1001, "close the connection")

        } else {
            Log.e(TAG, "no need to cancel and close socket !!!")
        }
    }

    /* external open. */
    @JvmStatic
    fun sendMessage(webSocketMessage: WebSocketMessage) {
        val messageJsonString = Gson().toJson(webSocketMessage)
        Log.d(TAG, "sendMessage: message to send: $messageJsonString")

        sendMessage(messageJsonString)
    }

    /* external open. */
    @JvmStatic
    fun sendMessage(webSocketConnectionMessage: WebSocketConnectionMessage) {
        val messageJsonString = Gson().toJson(webSocketConnectionMessage)
        Log.d(TAG, "sendMessage: message to send: $messageJsonString")

        sendMessage(messageJsonString)
    }

    private fun createWebSocket(client: OkHttpClient) {
        if (okHttpRequest != null) {
            client.newWebSocket(okHttpRequest!!, webSocketListener)

        } else {
            Log.e(TAG, "connect: okHttpRequest is invalid !!!")
            resultListener?.onConnectionTryError()
        }
    }

    private fun reconnect() {
        if (reconnectionCount <= MAX_NUM) {
            try {
                Thread.sleep(RECONNECTION_INTERVAL_TIME.toLong())
                connect()
                reconnectionCount++
            } catch (e: InterruptedException) {
                e.printStackTrace()
            }
        } else {
            Log.e(TAG, "reconnect: reconnection count is exceeded !!!")
            resultListener?.onReconnectionTimeExceeded()
        }
    }

    private fun sendMessage(text: String): Boolean? = if (!isConnected) {
        Log.e(TAG, "sendMessage: connection is not established !!!")
        false
    } else {
        webSocketClient?.send(text)
    }

    private fun sendMessage(byteString: ByteString): Boolean? = if (!isConnected) {
        Log.e(TAG, "sendMessage: connection is not established !!!")
        false
    } else {
        webSocketClient?.send(byteString)
    }

    private val webSocketListener = object : WebSocketListener() {
        override fun onOpen(webSocket: WebSocket, response: Response) {
            super.onOpen(webSocket, response)

            Log.i(TAG, "onOpen: ")
            webSocketClient = webSocket
            isConnected = response.code == 101

            if (!isConnected) {
                reconnect()
            } else {
                resultListener?.onConnectionSuccess()
            }
        }

        override fun onMessage(webSocket: WebSocket, bytes: ByteString) {
            super.onMessage(webSocket, bytes)

            Log.i(TAG, "onMessage: bytes: $bytes")
            resultListener?.onMessage(bytes.base64())
        }

        override fun onMessage(webSocket: WebSocket, text: String) {
            super.onMessage(webSocket, text)

            Log.i(TAG, "onMessage: text: $text")
            resultListener?.onMessage(text)
        }

        override fun onClosed(webSocket: WebSocket, code: Int, reason: String) {
            super.onClosed(webSocket, code, reason)

            Log.e(TAG, "onClosed: code: $code, reason: $reason")
            handleCloseEvent()
        }

        override fun onClosing(webSocket: WebSocket, code: Int, reason: String) {
            super.onClosing(webSocket, code, reason)

            Log.e(TAG, "onClosing: code: $code, reason: $reason")
            handleCloseEvent()
        }

        override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
            super.onFailure(webSocket, t, response)

            Log.e(TAG, "onFailure: throwable: ${t.message}, response: $response")
            handleFailureEvent()
            reconnect()
        }
    }

    private fun handleCloseEvent() {
        isConnected = false
        resultListener?.onClose()
    }

    private fun handleFailureEvent() {
        isConnected = false
        resultListener?.onConnectionFailed()
    }

    private fun clearResources() {
        Log.i(TAG, "clearResources: ")
        isConnected = false
        reconnectionCount = 0

        okHttpClient = null
        okHttpRequest = null

        resultListener = null
        webSocketClient = null
    }
}