package io.github.aidenkoog.news_app.data.database

import androidx.room.Dao
import androidx.room.Query
import androidx.room.Upsert
import io.github.aidenkoog.news_app.data.database.model.NewsEntity
import kotlinx.coroutines.flow.Flow

/**
 * Data access object pattern for retrieving and updating the news.
 */
@Dao
interface NewsDao {

    @Query("SELECT * FROM news WHERE `query` LIKE :query")
    fun getNewsByQuery(query: String) : Flow<List<NewsEntity>>

    @Upsert
    suspend fun saveNews(news: List<NewsEntity>)
}