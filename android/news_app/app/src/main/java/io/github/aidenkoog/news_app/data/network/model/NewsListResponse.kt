package io.github.aidenkoog.news_app.data.network.model

import com.google.gson.annotations.SerializedName

/**
 * Network model of a list of news.
 */
data class NewsListResponse(
    @SerializedName("articles")
    val news: List<NewsResponse>
)