package io.github.aidenkoog.apptemplate2nd.data.local

import androidx.lifecycle.LiveData
import androidx.room.*
import io.github.aidenkoog.apptemplate2nd.data.model.CocktailEntity
import io.github.aidenkoog.apptemplate2nd.data.model.FavoritesEntity


@Dao
interface CocktailDao {

    @Query("SELECT * FROM favoritesTable")
    suspend fun getAllFavoriteDrinks(): List<FavoritesEntity>

    @Query("SELECT * FROM favoritesTable")
    fun getAllFavoriteDrinksWithChanges(): LiveData<List<FavoritesEntity>>

    @Query("SELECT * FROM itemTable WHERE trago_nombre LIKE '%' || :cocktailName || '%'") // This Like operator is needed due that the API returns blank spaces in the name
    suspend fun getItems(cocktailName: String): List<CocktailEntity>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun saveFavoriteCocktail(trago: FavoritesEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun saveCocktail(cocktail: CocktailEntity)

    @Delete
    suspend fun deleteFavoriteItem(favorites: FavoritesEntity)

    @Query("SELECT * FROM favoritesTable WHERE itemId = :itemId")
    suspend fun getCocktailById(itemId: String): FavoritesEntity?
}