package io.github.aidenkoog.news_app.domain

import io.github.aidenkoog.news_app.domain.repository.NewsRepository
import io.github.aidenkoog.news_app.domain.model.News
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

/**
 * Use case to search for news by a given query.
 */
class SearchNewsUseCase @Inject constructor(private val newsRepository: NewsRepository) {

    operator fun invoke(query: String): Flow<List<News>> =
        newsRepository.searchNewsOfflineFirst(query)
}
