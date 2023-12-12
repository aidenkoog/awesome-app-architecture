package io.github.aidenkoog.apptemplate.domain.usecase.feature

import dagger.hilt.android.scopes.ViewModelScoped
import io.github.aidenkoog.apptemplate.di.coroutine.IoDispatcher
import io.github.aidenkoog.apptemplate.domain.model.Response
import io.github.aidenkoog.apptemplate.domain.usecase.base.CoroutineUseCase
import io.github.aidenkoog.apptemplate.domain.usecase.base.Result
import io.github.aidenkoog.apptemplate.domain.usecase.base.ResultUseCase
import kotlinx.coroutines.CoroutineDispatcher
import timber.log.Timber
import javax.inject.Inject

@ViewModelScoped
class UserUseCase @Inject constructor(
    @IoDispatcher private val ioDispatcher: CoroutineDispatcher,
) : CoroutineUseCase, ResultUseCase<Response<Any>, Long>() {

    override suspend fun invoke(params: Long): Result<Response<Any>>? {
        TODO("Not yet implemented")
    }
    /*override suspend operator fun invoke(params: Long) = invoke(ioDispatcher) {
        Timber.d("debug: params: $params")

    }*/
}