package io.github.aidenkoog.android.domain.repository

import io.reactivex.Single
import io.github.aidenkoog.android.domain.model.Device

interface DeviceRepository {
    fun requestDeviceStatus(deviceId: String?): Single<List<Device>>
}