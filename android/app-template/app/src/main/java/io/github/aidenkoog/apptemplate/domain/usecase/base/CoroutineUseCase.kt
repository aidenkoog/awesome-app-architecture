package io.github.aidenkoog.apptemplate.domain.usecase.base

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.supervisorScope
import kotlinx.coroutines.withContext

interface CoroutineUseCase {

    /**
     * other coroutines viewModelScope are not influenced by this scope because of supervisorScope.
     */
    suspend operator fun <T> invoke(block: suspend () -> T) = supervisorScope {
        try {
            CustomResult.Success(block())

        } catch (e: Exception) {
            CustomResult.Failure(e)
        }
    }

    /**
     * developer can set dispatcher to block.
     */
    suspend operator fun <T> invoke(
        dispatcher: CoroutineDispatcher,
        block: suspend () -> T,
    ): CustomResult<T> = supervisorScope {
        try {
            CustomResult.Success(withContext(dispatcher) { block() })

        } catch (e: Exception) {
            CustomResult.Failure(e)
        }
    }
}