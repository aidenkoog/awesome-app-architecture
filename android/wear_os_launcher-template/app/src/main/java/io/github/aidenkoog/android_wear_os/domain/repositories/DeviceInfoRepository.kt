package io.github.aidenkoog.android_wear_os.domain.repositories

import io.github.aidenkoog.android_wear_os.domain.model.DeviceInfo
import io.github.aidenkoog.android_wear_os.domain.model.SocketResult
import io.reactivex.Single

interface DeviceInfoRepository {
    fun getDevices(): ArrayList<String>?
    fun getDevice(id: Long?): Single<DeviceInfo>?
    fun connectSocket()
    fun sendSos()
}