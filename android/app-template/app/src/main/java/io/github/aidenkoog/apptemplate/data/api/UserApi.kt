package io.github.aidenkoog.apptemplate.data.api

import io.github.aidenkoog.apptemplate.domain.model.Response
import io.github.aidenkoog.apptemplate.infrastructure.retrofit.annotation.BaseUrl
import io.github.aidenkoog.apptemplate.infrastructure.retrofit.params.BodyParams
import io.github.aidenkoog.apptemplate.infrastructure.url.BaseApiUrl
import io.reactivex.Single
import retrofit2.http.*
import java.util.*

@BaseUrl(baseUrl = BaseApiUrl::class)
// @Factory(factory = UserApiFactory::class)
interface UserApi {

    /*
     * getUsers is called with coroutine.
     */
    @Headers("content-type: application/json")
    @GET("/users")
    suspend fun getUsers(
        @Query("timestamp") timestamp: Long,
    ): Response<List<Any>>

    /*
     * RxJava
     */
    @Headers("content-type: application/json")
    @POST("/user/register")
    fun registerUser(
        @Body body: BodyParams,
    ): Single<Response<Any>>

    @Headers("content-type: application/json")
    @DELETE("/user/{userId}/delete")
    fun deleteUser(
    ): Single<Response<Any>>
}