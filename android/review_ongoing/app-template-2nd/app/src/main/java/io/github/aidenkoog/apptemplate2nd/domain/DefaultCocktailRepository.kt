package io.github.aidenkoog.apptemplate2nd.domain

import androidx.lifecycle.LiveData
import io.github.aidenkoog.apptemplate2nd.core.Resource
import io.github.aidenkoog.apptemplate2nd.data.local.LocalDataSource
import io.github.aidenkoog.apptemplate2nd.data.model.Cocktail
import io.github.aidenkoog.apptemplate2nd.data.model.CocktailEntity
import io.github.aidenkoog.apptemplate2nd.data.model.asCocktailEntity
import io.github.aidenkoog.apptemplate2nd.data.remote.NetworkDataSource
import dagger.hilt.android.scopes.ActivityRetainedScoped
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.cancel
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.flow.collect
import javax.inject.Inject

@ExperimentalCoroutinesApi
@ActivityRetainedScoped
class DefaultCocktailRepository @Inject constructor(
    private val networkDataSource: NetworkDataSource,
    private val localDataSource: LocalDataSource
) : CocktailRepository {

    override suspend fun getCocktailByName(cocktailName: String): Flow<Resource<List<Cocktail>>> =
        callbackFlow {

            offer(getCachedItems(cocktailName))

            networkDataSource.getCocktailByName(cocktailName).collect {
                when (it) {
                    is Resource.Success -> {
                        for (cocktail in it.data) {
                            saveCocktail(cocktail.asCocktailEntity())
                        }
                        offer(getCachedItems(cocktailName))
                    }

                    is Resource.Failure -> {
                        offer(getCachedItems(cocktailName))
                    }
                }
            }
            awaitClose { cancel() }
        }

    override suspend fun saveFavoriteCocktail(cocktail: Cocktail) {
        localDataSource.saveFavoriteCocktail(cocktail)
    }

    override suspend fun isCocktailFavorite(cocktail: Cocktail): Boolean =
        localDataSource.isCocktailFavorite(cocktail)

    override suspend fun saveCocktail(cocktail: CocktailEntity) {
        localDataSource.saveCocktail(cocktail)
    }

    override fun getFavoritesItems(): LiveData<List<Cocktail>> {
        return localDataSource.getFavoritesItems()
    }

    override suspend fun deleteFavoriteCocktail(cocktail: Cocktail) {
        localDataSource.deleteCocktail(cocktail)
    }

    override suspend fun getCachedItems(cocktailName: String): Resource<List<Cocktail>> {
        return localDataSource.getCachedItems(cocktailName)
    }
}