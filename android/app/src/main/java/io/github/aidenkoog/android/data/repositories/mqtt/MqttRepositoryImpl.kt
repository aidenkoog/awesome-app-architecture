package io.github.aidenkoog.android.data.repositories.mqtt

import com.amazonaws.auth.AWSCredentialsProvider
import com.amazonaws.auth.BasicSessionCredentials
import com.amazonaws.internal.StaticCredentialsProvider
import com.amazonaws.mobileconnectors.iot.*
import com.amazonaws.util.StringUtils.UTF8
import com.orhanobut.logger.Logger
import io.github.aidenkoog.android.data.repositories.mqtt.listeners.OnMqttConnectListener
import io.github.aidenkoog.android.data.repositories.mqtt.listeners.OnMqttSubscribeListener

import java.io.UnsupportedEncodingException
import java.lang.Exception

@Suppress("NAME_SHADOWING")
class MqttRepositoryImpl {
    companion object {
        var clientId: String? = null
        var mqttManager: AWSIotMqttManager? = null
    }

    fun getClientId(): String? {
        return clientId
    }

    fun init(id: String?, iotEndPoint: String?) {
        Logger.d("id: $id")
        clientId = id
        if (mqttManager != null) {
            mqttManager?.disconnect()
        }
        mqttManager = AWSIotMqttManager(clientId, iotEndPoint)
    }

    fun connect(
        accessKeyId: String?,
        secretKey: String?,
        sessionToken: String?,
        callback: OnMqttConnectListener?
    ) {
        try {

            val basicSessionCredentials =
                BasicSessionCredentials(accessKeyId, secretKey, sessionToken)
            val credentialsProvider: AWSCredentialsProvider =
                StaticCredentialsProvider(basicSessionCredentials)
            mqttManager?.connect(credentialsProvider) { status, throwable ->
                Logger.d("Status: $status")
                try {
                    callback?.onStatusChanged(status, throwable)
                } catch (e: Exception) {
                    Logger.e("EOF Exception occur $e")
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    fun disconnect() {
        try {
            mqttManager?.disconnect()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    fun subscribe(topic: String, callback: OnMqttSubscribeListener) {
        Logger.d("SUBSCRIBE topic : $topic")
        try {
            mqttManager?.subscribeToTopic(
                topic, AWSIotMqttQos.QOS1
            ) { topic, data ->
                try {
                    val message = data.toString(UTF8)
                    callback.subscribeMessage(topic, message)
                } catch (e: UnsupportedEncodingException) {
                    Logger.e("Message encoding error. ($e)")
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    fun unSubscribe(topic: String) {
        mqttManager?.unsubscribeTopic(topic)
    }
}