package io.github.aidenkoog.android.domain.model

interface RequestDataSource {
    data class SignIn(
        var userId: String?,
        var password: String?,
    )
}
