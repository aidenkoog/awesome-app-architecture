package io.github.aidenkoog.news_list.data.api

import io.github.aidenkoog.news_list.data.model.TopHeadlinesResponse
import io.github.aidenkoog.news_list.utils.AppConstant.API_KEY
import retrofit2.http.GET
import retrofit2.http.Headers
import retrofit2.http.Query
import javax.inject.Singleton

@Singleton
interface NetworkService {

    /**
     * Request parameters.
     * Your API key. Alternatively you can provide this via the X-Api-Key HTTP header.
     * Link : https://newsapi.org/docs/endpoints/top-headlines
     * Ref. : https://newsapi.org/v2/top-headlines?
     */
    @Headers("X-Api-Key: $API_KEY")
    @GET("top-headlines")
    suspend fun getTopHeadlines(
        @Query("country") country: String): TopHeadlinesResponse
}