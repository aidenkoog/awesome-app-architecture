package io.github.aidenkoog.android.data.repository

import io.github.aidenkoog.android.data.source.remote.RetrofitService
import io.github.aidenkoog.android.domain.model.User
import io.github.aidenkoog.android.domain.repository.UserRepository
import io.reactivex.Single

class UserRepositoryImpl(
    private val retrofitService: RetrofitService,
) : UserRepository {

    override fun getUsers(): Single<List<User>> {
        return retrofitService.getUsers()
    }
}
