package io.github.aidenkoog.image_viewer.api

import io.github.aidenkoog.image_viewer.model.Item

data class ImageSearchResponse(
    val lastBuildDate: String,
    val total: Int,
    val start: Int,
    val display: Int,
    val items: List<Item>
)