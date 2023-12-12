package io.github.aidenkoog.apptemplate.data

import io.github.aidenkoog.apptemplate.data.api.UserApi
import io.github.aidenkoog.apptemplate.infrastructure.retrofit.repository.RetrofitRepository.create

object RequestHelper {

    private fun userApi() = create(UserApi::class.java)
    suspend fun getUsers() = userApi().getUsers(0L)
}