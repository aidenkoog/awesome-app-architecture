package io.github.aidenkoog.android.domain.usecase.base
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.withContext

abstract class CoroutineUseCase<in P, out T>(
    private val coroutineDispatcher: CoroutineDispatcher
) where T : Any {

    abstract suspend fun execute(params: P): T

    suspend operator fun invoke(
        params: P
    ) = try {
        withContext(coroutineDispatcher) {
            execute(params).let {
                //TODO:
            }
        }
    } catch (e: Exception) {
        //TODO:
    }
}
