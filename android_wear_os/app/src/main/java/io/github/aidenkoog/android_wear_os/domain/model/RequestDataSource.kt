package io.github.aidenkoog.android_wear_os.domain.model

interface RequestDataSource {
    data class SignIn(
        var userId: String?,
        var password: String?,
    )
}
