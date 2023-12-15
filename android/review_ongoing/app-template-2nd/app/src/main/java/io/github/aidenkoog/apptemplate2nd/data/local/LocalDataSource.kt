package io.github.aidenkoog.apptemplate2nd.data.local

import androidx.lifecycle.LiveData
import androidx.lifecycle.map
import io.github.aidenkoog.apptemplate2nd.core.Resource
import io.github.aidenkoog.apptemplate2nd.data.model.*
import kotlinx.coroutines.ExperimentalCoroutinesApi
import javax.inject.Inject


@ExperimentalCoroutinesApi
class LocalDataSource @Inject constructor(private val cocktailDao: CocktailDao) {
    suspend fun saveFavoriteCocktail(cocktail: Cocktail) {
        return cocktailDao.saveFavoriteCocktail(cocktail.asFavoriteEntity())
    }

    fun getFavoritesItems(): LiveData<List<Cocktail>> {
        return cocktailDao.getAllFavoriteDrinksWithChanges().map { it.asDrinkList() }
    }

    suspend fun deleteCocktail(cocktail: Cocktail) {
        return cocktailDao.deleteFavoriteCoktail(cocktail.asFavoriteEntity())
    }

    suspend fun saveCocktail(cocktail: CocktailEntity) {
        cocktailDao.saveCocktail(cocktail)
    }

    suspend fun getCachedItems(cocktailName: String): Resource<List<Cocktail>> {
        return Resource.Success(cocktailDao.getItems(cocktailName).aslist())
    }

    suspend fun isCocktailFavorite(cocktail: Cocktail): Boolean {
        return cocktailDao.getCocktailById(cocktail.cocktailId) != null
    }
}