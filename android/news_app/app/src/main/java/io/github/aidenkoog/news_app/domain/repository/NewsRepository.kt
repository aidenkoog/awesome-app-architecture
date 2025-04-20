package io.github.aidenkoog.news_app.domain.repository

import io.github.aidenkoog.news_app.data.network.model.NewsListResponse
import io.github.aidenkoog.news_app.domain.model.News
import kotlinx.coroutines.flow.Flow

interface NewsRepository {

    fun searchNews(query: String): Flow<NewsListResponse>

    fun searchNewsOfflineFirst(query: String): Flow<List<News>>

    suspend fun refreshNews(query: String)
}