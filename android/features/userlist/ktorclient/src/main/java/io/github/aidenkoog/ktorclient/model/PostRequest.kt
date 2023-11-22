package io.github.aidenkoog.ktorclient.model

import kotlinx.serialization.Serializable

@Serializable
data class PostRequest(
    val body: String,
    val title: String,
    val userId: Int,
)
