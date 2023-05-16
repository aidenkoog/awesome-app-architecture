package io.github.aidenkoog.android.data.repository

import io.github.aidenkoog.android.data.mapper.toEntity
import io.github.aidenkoog.android.data.source.local.AppDatabase
import io.github.aidenkoog.android.data.source.remote.RetrofitService
import io.github.aidenkoog.android.domain.model.User
import io.github.aidenkoog.android.domain.repository.UserDetailRepository
import io.reactivex.Single

class UserDetailRepositoryImpl(
    private val database: AppDatabase,
    private val retrofitService: RetrofitService,
) : UserDetailRepository {

    override fun isFavorite(id: Int): Boolean {
        return database.userDao.loadOneByUserId(id) != null
    }

    override fun deleteUser(user: User) {
        database.userDao.delete(user.toEntity())
    }

    override fun addUser(user: User) {
        database.userDao.insert(user.toEntity())
    }

    override fun getUsers(): Single<List<User>> {
        return retrofitService.getUsers()
    }
}
