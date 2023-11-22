package io.github.aidenkoog.android.domain.model

// unused
interface RequestDataSource {
    data class SignIn(
        var userId: String?,
        var password: String?,
    )
}
