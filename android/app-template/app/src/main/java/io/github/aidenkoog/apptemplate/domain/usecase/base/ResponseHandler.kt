package io.github.aidenkoog.apptemplate.domain.usecase.base

import io.github.aidenkoog.apptemplate.domain.model.Response
import io.github.aidenkoog.apptemplate.exception.ExpiredRefreshTokenException
import io.github.aidenkoog.apptemplate.exception.NetworkException
import timber.log.Timber

class Error<T>(val result: Result<Response<T>>) {
    private var isAlreadyChecked = false

    suspend fun invokeIfNotHandled(block: suspend () -> Unit) {
        if (isAlreadyChecked.not()) {
            isAlreadyChecked = true
            runCatching { block() }
        }
    }
}

suspend inline fun <T> Result<Response<T>>.onResponse(
    crossinline block: suspend (T?) -> Unit
): Error<T> {
    if (this is Result.Success && this.value.isSuccess()) {
        runCatching { block(this.value.data) }
    }
    return Error(this)
}

suspend inline fun <T> Error<T>.onError(
    crossinline block: suspend (errorCode: Int, errorMessage: String?) -> Unit
) = apply {
    if (result is Result.Success && result.value.isSuccess().not()) {
        invokeIfNotHandled {
            block(result.value.code, result.value.message)
        }
    }
}

suspend inline fun <T> Error<T>.onError(
    vararg errorCode: Int,
    crossinline block: suspend (errorMessage: String?) -> Unit,
) = apply {
    if (result is Result.Success && result.value.isSuccess().not() && errorCode.any {
            it == result.value.code
        }) {
        invokeIfNotHandled {
            block(result.value.message)
        }
    }
}

suspend inline fun <T> Error<T>.onFailure(
    crossinline block: suspend (exception: Exception) -> Unit
) = apply {
    if (result is Result.Failure) {
        invokeIfNotHandled {
            block(result.exception)
        }
    }
}

suspend fun <T> Error<T>.doFinally(block: suspend () -> Unit) = apply {
    block()
}

suspend fun <T> Error<T>.handleError() = handleError { }

suspend inline fun <T> Error<T>.handleError(
    crossinline block: suspend (message: String) -> Unit
) = apply {
    onError(900, 901, 902) {
        block("error 1")
        //TODO:
    }.onError(801, 802, 803) {
        //TODO:
    }.onFailure {
        Timber.e("onFailure: $it")
        block(
            when (it) {
                is ExpiredRefreshTokenException -> "error 3"
                is NetworkException -> "error 4"
                else -> "unknown error"
            }
        )
        if (it is ExpiredRefreshTokenException) {
            //TODO:
        }
    }
}