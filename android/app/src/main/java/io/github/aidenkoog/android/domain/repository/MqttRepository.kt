package io.github.aidenkoog.android.domain.repository

import io.reactivex.Single
import io.github.aidenkoog.android.domain.model.Device

interface MqttRepository {
    fun connectAwsIotCore()
}