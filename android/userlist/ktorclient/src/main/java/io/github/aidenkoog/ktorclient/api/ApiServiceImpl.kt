package io.github.aidenkoog.ktorclient.api

import android.util.Log
import io.github.aidenkoog.ktorclient.model.PostRequest
import io.github.aidenkoog.ktorclient.model.PostResponse
import io.ktor.client.*
import io.ktor.client.plugins.*

class ApiServiceImpl(private val client: HttpClient) : ApiService {
    override suspend fun getPosts(): List<PostResponse>? {
        return try {
            return null
        } catch (e: RedirectResponseException) {
            // 3xx responses
            Log.e("debug", "Error : ${e.response.status.description}")
            emptyList()
        } catch (e: ClientRequestException) {
            // 4xx responses
            Log.e("debug", "Error : ${e.response.status.description}")
            emptyList()
        } catch (e: ServerResponseException) {
            // 5xx responses
            Log.e("debug", "Error : ${e.response.status.description}")
            emptyList()
        } catch (e: Exception) {
            Log.e("debug", "Error : ${e.message}")
            emptyList()
        }
    }

    override suspend fun createPost(postRequest: PostRequest): PostResponse? {
        return try {
            return null
        } catch (e: RedirectResponseException) {
            // 3xx responses
            Log.e("debug", "Error : ${e.response.status.description}")
            null
        } catch (e: ClientRequestException) {
            // 4xx responses
            Log.e("debug", "Error : ${e.response.status.description}")
            null
        } catch (e: ServerResponseException) {
            // 5xx responses
            Log.e("debug", "Error : ${e.response.status.description}")
            null
        } catch (e: Exception) {
            Log.e("debug", "Error : ${e.message}")
            null
        }
    }
}