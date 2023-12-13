package io.github.aidenkoog.apptemplate.domain.usecase.base

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.withContext

abstract class BaseCoroutineUseCase<in P, out T>(
    private val coroutineDispatcher: CoroutineDispatcher,
) where T : Any {

    abstract suspend fun execute(params: P): T

    suspend operator fun invoke(
        params: P,
    ) = try {
        withContext(coroutineDispatcher) {
            execute(params).let {
                CustomResult.Success(it)
            }
        }
    } catch (e: Exception) {
        CustomResult.Failure(e)
    }
}
