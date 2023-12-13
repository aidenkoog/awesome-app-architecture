package io.github.aidenkoog.apptemplate.data.api

import io.github.aidenkoog.apptemplate.domain.model.Response
import io.github.aidenkoog.apptemplate.infrastructure.retrofit.annotation.BaseUrl
import io.github.aidenkoog.apptemplate.infrastructure.retrofit.params.BodyParams
import io.github.aidenkoog.apptemplate.infrastructure.url.BaseApiUrl
import io.reactivex.Single
import retrofit2.http.*
import java.util.*

/*
 * these apis don't work.
 * they are just defined for clean architecture of android.
 */
@BaseUrl(baseUrl = BaseApiUrl::class)
// @Factory(factory = UserApiFactory::class)
interface UserApi {

    /*
     * Coroutine
     *
     * getUsers is called with coroutine.
     */
    @Headers("content-type: application/json")
    @GET("/users")
    suspend fun getUsers(
        @Query("timestamp") timestamp: Long,
    ): Response<List<Any>>

    /*
     * RxJava
     *
     * Single: onSuccess / onError
     * Observable: onNext / onComplete / onError
     * Maybe: onSuccess / onError / onComplete
     * Completable: onComplete / onError
     */
    @Headers("content-type: application/json")
    @POST("/user/register")
    fun registerUser(
        @Body body: BodyParams,
    ): Single<Response<Any>>

    /*
     * RxJava
     *
     * Single: onSuccess / onError
     */
    @Headers("content-type: application/json")
    @DELETE("/user/{userId}/delete")
    fun deleteUser(
    ): Single<Response<Any>>
}