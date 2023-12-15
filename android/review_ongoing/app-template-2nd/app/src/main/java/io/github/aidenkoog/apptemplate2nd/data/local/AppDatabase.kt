package io.github.aidenkoog.apptemplate2nd.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import io.github.aidenkoog.apptemplate2nd.data.model.CocktailEntity
import io.github.aidenkoog.apptemplate2nd.data.model.FavoritesEntity

@Database(
    entities = [FavoritesEntity::class, CocktailEntity::class],
    version = 3,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {
    abstract fun cocktailDao(): CocktailDao
}