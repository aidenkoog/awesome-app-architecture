package io.github.aidenkoog.news_app.domain.mapper

import io.github.aidenkoog.news_app.data.database.model.NewsEntity
import io.github.aidenkoog.news_app.data.network.model.NewsResponse
import io.github.aidenkoog.news_app.domain.model.News

/**
 * Extension functions to convert between the different models.
 *
 * NewsEntity: database model.
 * NewsResponse: network model.
 * News: domain model.
 */


/**
 * Converts the network model to the local model for persisting by the local data source.
 */
fun NewsResponse.asEntity() = NewsEntity(
    author = author,
    title = title,
    description = description,
    url = url,
    urlToImage = urlToImage,
    content = content
)

/**
 * Converts the local model to the external model for use by layers external to the data layer.
 */
fun NewsEntity.toDomain() = News(
    author = author,
    title = title,
    description = description,
    url = url,
    urlToImage = urlToImage,
    content = content
)