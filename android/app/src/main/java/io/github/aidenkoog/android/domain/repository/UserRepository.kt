package io.github.aidenkoog.android.domain.repository

import io.reactivex.Single
import io.github.aidenkoog.android.domain.model.User

interface UserRepository {
    fun requestLogin(id: String, pw: String): Single<List<User>>
}