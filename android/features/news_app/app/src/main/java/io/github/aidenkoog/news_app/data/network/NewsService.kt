package io.github.aidenkoog.news_app.data.network

import io.github.aidenkoog.news_app.data.network.model.NewsListResponse
import retrofit2.http.GET
import retrofit2.http.Query

/**
 * Service with the main functions to access the API.
 */
interface NewsService {

    companion object {
        const val BASE_URL = "https://newsapi.org"
    }

    @GET("/v2/everything")
    suspend fun searchNews(@Query("q") query: String): NewsListResponse
}