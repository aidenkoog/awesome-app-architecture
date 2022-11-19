package io.github.aidenkoog.android.domain.usecase

import io.reactivex.Single
import io.github.aidenkoog.android.domain.model.User
import io.github.aidenkoog.android.domain.repository.UserRepository
import io.github.aidenkoog.android.domain.usecase.base.SingleUseCase
import javax.inject.Inject

class LoginUseCase @Inject constructor(
    private val repository: UserRepository
) : SingleUseCase<List<User>>() {

    override fun buildUseCaseSingle(): Single<List<User>> {
        return repository.requestLogin("", "")
    }
}