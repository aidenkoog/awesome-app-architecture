package io.github.aidenkoog.android.data.source.remote

import io.github.aidenkoog.android.domain.model.User
import io.reactivex.Single
import retrofit2.http.GET

interface RetrofitService {
    @GET("posts/")
    fun getUsers(): Single<List<User>>
}
