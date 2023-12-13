package io.github.aidenkoog.apptemplate.domain.usecase.base

sealed class CustomResult<out T> {
    data class Success<out T>(val value: T) : CustomResult<T>()
    data class Failure(val exception: Exception) : CustomResult<Nothing>()

    fun subscribe(onSuccess: (T) -> Unit, onFailure: (Exception) -> Unit) {
        when (this) {
            is Success -> onSuccess(value)
            is Failure -> onFailure(exception)
        }
    }

    fun <R> onReturn(onSuccess: (T) -> R, onFailure: (Exception) -> R) = when (this) {
        is Success -> onSuccess(value)
        is Failure -> onFailure(exception)
    }

    suspend fun onSuccess(block: suspend (T) -> Unit) = apply {
        if (this is Success) block(value)
    }

    suspend fun onFailure(block: suspend (Exception) -> Unit) = apply {
        if (this is Failure) block(exception)
    }

    fun isSuccess() = this is Success
    fun isFailure() = this is Failure
}