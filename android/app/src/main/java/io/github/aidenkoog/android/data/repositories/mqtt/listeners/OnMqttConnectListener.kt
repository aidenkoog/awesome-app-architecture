package io.github.aidenkoog.android.data.repositories.mqtt.listeners

import com.amazonaws.mobileconnectors.iot.AWSIotMqttClientStatusCallback.AWSIotMqttClientStatus

interface OnMqttConnectListener {
    fun onStatusChanged(status: AWSIotMqttClientStatus?, throwable: Throwable?)
}
