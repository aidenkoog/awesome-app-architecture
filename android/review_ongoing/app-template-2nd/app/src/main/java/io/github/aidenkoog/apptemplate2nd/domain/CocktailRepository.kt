package io.github.aidenkoog.apptemplate2nd.domain

import androidx.lifecycle.LiveData
import io.github.aidenkoog.apptemplate2nd.core.Resource
import io.github.aidenkoog.apptemplate2nd.data.model.Cocktail
import io.github.aidenkoog.apptemplate2nd.data.model.CocktailEntity
import kotlinx.coroutines.flow.Flow

interface CocktailRepository {
    suspend fun getCocktailByName(cocktailName: String): Flow<Resource<List<Cocktail>>>
    suspend fun saveFavoriteCocktail(cocktail: Cocktail)
    suspend fun isCocktailFavorite(cocktail: Cocktail): Boolean
    suspend fun getCachedItems(cocktailName: String): Resource<List<Cocktail>>
    suspend fun saveCocktail(cocktail: CocktailEntity)
    fun getFavoritesItems(): LiveData<List<Cocktail>>
    suspend fun deleteFavoriteCocktail(cocktail: Cocktail)
}