package io.github.aidenkoog.android.data.source.remote.rest

import io.reactivex.Single
import io.github.aidenkoog.android.domain.model.AppInfo
import io.github.aidenkoog.android.domain.model.Device
import io.github.aidenkoog.android.domain.model.User
import retrofit2.http.GET
import retrofit2.http.Path

interface RetrofitService {

    @GET("/api/v2/app/version")
    fun requestAppVersion(): Single<List<AppInfo>>

    @GET("/api/v2/device/{id}/status")
    fun requestDeviceStatus(@Path("id") id: String): Single<List<Device>>

    @GET("/api/v2/user/{os}/login")
    fun requestLogin(@Path("os") os: String): Single<List<User>>
}