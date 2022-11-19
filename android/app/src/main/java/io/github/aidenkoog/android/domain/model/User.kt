package io.github.aidenkoog.android.domain.model

data class User(
    var id: String,
    var accessToken: String,
    var refreshToken: String
)
