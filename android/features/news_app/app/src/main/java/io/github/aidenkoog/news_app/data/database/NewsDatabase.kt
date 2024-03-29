package io.github.aidenkoog.news_app.data.database

import androidx.room.Database
import androidx.room.RoomDatabase
import io.github.aidenkoog.news_app.data.database.model.NewsEntity

/**
 * Database of the application to store a list of news.
 */
@Database(entities = [NewsEntity::class], version = 1, exportSchema = false)
abstract class NewsDatabase : RoomDatabase(){

    companion object {
        const val DATABASE_NAME = "news_database"
    }

    abstract fun newsDao() : NewsDao
}