package io.github.aidenkoog.ktorclient.api

import io.github.aidenkoog.ktorclient.model.PostRequest
import io.github.aidenkoog.ktorclient.model.PostResponse

interface ApiService {
    suspend fun getPosts(): List<PostResponse>?
    suspend fun createPost(postRequest: PostRequest): PostResponse?
}