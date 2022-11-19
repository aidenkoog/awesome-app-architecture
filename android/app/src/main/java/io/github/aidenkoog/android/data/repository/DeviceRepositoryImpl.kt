package io.github.aidenkoog.android.data.repository

import io.reactivex.Single
import io.github.aidenkoog.android.data.source.remote.rest.RetrofitService
import io.github.aidenkoog.android.domain.model.Device
import io.github.aidenkoog.android.domain.repository.DeviceRepository

class DeviceRepositoryImpl(
    private val retrofitService: RetrofitService
) : DeviceRepository {
    override fun requestDeviceStatus(deviceId: String?): Single<List<Device>> {
        return retrofitService.requestDeviceStatus("")
    }
}