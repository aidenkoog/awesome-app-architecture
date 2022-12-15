package io.github.aidenkoog.android.data.repositories.mqtt.listeners

interface OnMqttSubscribeListener {
    fun subscribeMessage(topic: String?, message: String?)
}
