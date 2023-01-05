package io.github.aidenkoog.android_wear_os.data.sources.remote.rest

import io.github.aidenkoog.android_wear_os.domain.model.DeviceInfo
import io.reactivex.Single
import retrofit2.http.GET
import retrofit2.http.Path

interface RetrofitService {

    @GET("v1/device")
    fun getDevices(): Single<List<DeviceInfo>>

    @GET("v1/device/{id}/device")
    fun getDevice(@Path("id") id: Long): Single<List<DeviceInfo>>

}
