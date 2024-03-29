package io.github.aidenkoog.aiden_template.domain.model

import java.util.Date

/**
 * See Recipe example: https://food2fork.ca/
 */
data class Recipe(
    val id: Int,
    val title: String,
    val publisher: String,
    val featuredImage: String,
    val rating: Int,
    val sourceUrl: String,
    val ingredients: List<String> = listOf(),
    val dateAdded: Date,
    val dateUpdated: Date,
)