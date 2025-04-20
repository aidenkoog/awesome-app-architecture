package io.github.aidenkoog.android.domain.repository

import io.github.aidenkoog.android.domain.model.User
import io.reactivex.Single

interface UserRepository {
    fun getUsers(): Single<List<User>>
}
