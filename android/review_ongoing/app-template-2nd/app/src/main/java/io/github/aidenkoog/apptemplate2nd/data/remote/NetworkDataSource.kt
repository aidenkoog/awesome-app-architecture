package io.github.aidenkoog.apptemplate2nd.data.remote

import io.github.aidenkoog.apptemplate2nd.core.Resource
import io.github.aidenkoog.apptemplate2nd.data.model.Cocktail
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import javax.inject.Inject

@ExperimentalCoroutinesApi
class NetworkDataSource @Inject constructor(
    private val webService: WebService
) {
    suspend fun getCocktailByName(cocktailName: String): Flow<Resource<List<Cocktail>>> =
        callbackFlow {
            offer(
                Resource.Success(
                    webService.getCocktailByName(cocktailName)?.list ?: listOf()
                )
            )
            awaitClose { close() }
        }
}