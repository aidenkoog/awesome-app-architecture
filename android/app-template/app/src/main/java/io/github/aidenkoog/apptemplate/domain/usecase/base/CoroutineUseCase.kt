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
            Result.Success(block())

        } catch (e: Exception) {
            Result.Failure(e)
        }
    }

    suspend operator fun <T> invoke(
        dispatcher: CoroutineDispatcher,
        block: suspend () -> T,
    ): Result<T> = supervisorScope {
        try {
            Result.Success(withContext(dispatcher) { block() })

        } catch (e: Exception) {
            Result.Failure(e)
        }
    }
}