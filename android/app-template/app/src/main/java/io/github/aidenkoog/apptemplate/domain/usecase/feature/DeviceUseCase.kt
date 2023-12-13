package io.github.aidenkoog.apptemplate.domain.usecase.feature

import dagger.hilt.android.scopes.ViewModelScoped
import io.github.aidenkoog.apptemplate.di.coroutine.IoDispatcher
import io.github.aidenkoog.apptemplate.domain.model.Response
import io.github.aidenkoog.apptemplate.domain.usecase.base.CoroutineUseCase
import io.github.aidenkoog.apptemplate.domain.usecase.base.CustomResult
import io.github.aidenkoog.apptemplate.domain.usecase.base.ResultUseCase
import kotlinx.coroutines.CoroutineDispatcher
import timber.log.Timber
import javax.inject.Inject

@ViewModelScoped
class DeviceUseCase @Inject constructor(
    @IoDispatcher private val ioDispatcher: CoroutineDispatcher,
) : CoroutineUseCase, ResultUseCase<Response<Unit>, Long>() {

    /*override suspend operator fun invoke(params: Long) = invoke(ioDispatcher) {
        Timber.d("debug: params: $params")

    }*/
    override suspend fun invoke(params: Long): CustomResult<Response<Unit>> {
        TODO("Not yet implemented")
    }
}