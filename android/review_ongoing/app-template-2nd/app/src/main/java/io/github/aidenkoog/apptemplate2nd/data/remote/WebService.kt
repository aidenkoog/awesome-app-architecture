package io.github.aidenkoog.apptemplate2nd.data.remote

import io.github.aidenkoog.apptemplate2nd.data.model.list
import retrofit2.http.GET
import retrofit2.http.Query

interface WebService {
    @GET("search.php")
    suspend fun getCocktailByName(@Query(value = "s") tragoName: String): list?
}