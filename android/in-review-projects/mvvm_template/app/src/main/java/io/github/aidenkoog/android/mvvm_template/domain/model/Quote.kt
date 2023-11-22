package io.github.aidenkoog.android.mvvm_template.domain.model

import io.github.aidenkoog.android.mvvm_template.data.database.entities.QuoteEntity
import io.github.aidenkoog.android.mvvm_template.data.model.QuoteModel

data class Quote(val quote: String, val author: String)

fun QuoteModel.toDomain() = Quote(quote, author)
fun QuoteEntity.toDomain() = Quote(quote, author)