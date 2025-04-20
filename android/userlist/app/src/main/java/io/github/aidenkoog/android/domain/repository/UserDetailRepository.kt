package io.github.aidenkoog.android.domain.repository

import io.github.aidenkoog.android.domain.model.User
import io.reactivex.Single

interface UserDetailRepository {
    fun getUsers(): Single<List<User>>
    fun deleteUser(user: User)
    fun addUser(user: User)
    fun isFavorite(id: Int): Boolean
}
