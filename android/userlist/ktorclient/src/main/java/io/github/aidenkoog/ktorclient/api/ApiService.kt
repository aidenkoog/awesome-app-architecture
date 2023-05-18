package io.github.aidenkoog.ktorclient.api

import io.github.aidenkoog.ktorclient.model.PostRequest
import io.github.aidenkoog.ktorclient.model.PostResponse
import io.github.aidenkoog.ktorclient.model.Resource

interface ApiService {
    suspend fun getPosts(): Resource<List<PostResponse>>
    suspend fun createPost(postRequest: PostRequest): Resource<PostResponse>
}