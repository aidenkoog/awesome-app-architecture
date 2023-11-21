package io.github.aidenkoog.android.mvvm_template.data.network

import io.github.aidenkoog.android.mvvm_template.data.model.QuoteModel
import retrofit2.Response
import retrofit2.http.GET

interface QuoteApiClient {
    @GET("/.json")
    suspend fun getAllQuotes(): Response<List<QuoteModel>>
}