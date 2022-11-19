package io.github.aidenkoog.android.data.repository

import io.reactivex.Single
import io.github.aidenkoog.android.data.source.remote.rest.RetrofitService
import io.github.aidenkoog.android.domain.model.User
import io.github.aidenkoog.android.domain.repository.UserRepository

class UserRepositoryImpl(
    private val retrofitService: RetrofitService
) : UserRepository {
    override fun requestLogin(id: String, pw: String): Single<List<User>> {
        return retrofitService.requestLogin("")
    }
}