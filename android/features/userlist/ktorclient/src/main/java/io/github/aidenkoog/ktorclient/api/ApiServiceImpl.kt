package io.github.aidenkoog.ktorclient.api

import android.util.Log
import io.github.aidenkoog.ktorclient.model.PostRequest
import io.github.aidenkoog.ktorclient.model.PostResponse
import io.github.aidenkoog.ktorclient.model.Resource
import io.github.aidenkoog.ktorclient.route.HttpRoutes
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.plugins.*
import io.ktor.client.request.*

class ApiServiceImpl(private val client: HttpClient) : ApiService {
    override suspend fun getPosts(): Resource<List<PostResponse>> {
        return try {
            val response = client.get {
                url(HttpRoutes.POSTS_API_URL)
            }
            Resource.Success(response.body())

        } catch (e: RedirectResponseException) {
            Log.e("debug", "Error : ${e.response.status.description}")
            Resource.Error("${e.response}")
        } catch (e: ClientRequestException) {
            Log.e("debug", "Error : ${e.response.status.description}")
            Resource.Error("${e.response}")
        } catch (e: ServerResponseException) {
            Log.e("debug", "Error : ${e.response.status.description}")
            Resource.Error("${e.response}")
        } catch (e: Exception) {
            Log.e("debug", "Error : ${e.message}")
            Resource.Error("${e.message}")
        }
    }

    override suspend fun createPost(postRequest: PostRequest): Resource<PostResponse> {
        return try {
            val response = client.post {
                url(HttpRoutes.POSTS_API_URL)
                setBody(postRequest)
            }
            Resource.Success(response.body())
        } catch (e: RedirectResponseException) {
            Log.e("debug", "Error: ${e.response.status.description}")
            Resource.Error("${e.response}")
        } catch (e: ClientRequestException) {
            Log.e("debug", "Error: ${e.response.status.description}")
            Resource.Error("${e.response}")
        } catch (e: ServerResponseException) {
            Log.e("debug", "Error: ${e.response.status.description}")
            Resource.Error("${e.response}")
        } catch (e: Exception) {
            Log.e("debug", "Error: ${e.message}")
            Resource.Error("${e.message}")
        }
    }
}