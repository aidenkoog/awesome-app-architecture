package io.github.aidenkoog.android.domain.model

data class User(
    var id: Int,
    var userId: Int,
    var title: String,
    val body: String?,
)
