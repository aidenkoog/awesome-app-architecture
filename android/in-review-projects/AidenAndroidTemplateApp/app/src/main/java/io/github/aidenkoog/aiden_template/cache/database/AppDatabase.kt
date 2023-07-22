package io.github.aidenkoog.aiden_template.cache.database

import androidx.room.Database
import androidx.room.RoomDatabase
import io.github.aidenkoog.aiden_template.cache.RecipeDao
import io.github.aidenkoog.aiden_template.cache.model.RecipeEntity

@Database(entities = [RecipeEntity::class], version = 1)
abstract class AppDatabase : RoomDatabase() {

    abstract fun recipeDao(): RecipeDao

    companion object {
        val DATABASE_NAME: String = "recipe_db"
    }


}