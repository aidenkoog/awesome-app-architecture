package io.github.aidenkoog.android.mvvm_template.domain

import io.github.aidenkoog.android.mvvm_template.data.QuoteRepository
import io.github.aidenkoog.android.mvvm_template.data.database.entities.toDatabase
import io.github.aidenkoog.android.mvvm_template.domain.model.Quote
import javax.inject.Inject

class GetQuotesUseCase @Inject constructor(private val repository: QuoteRepository) {
    suspend operator fun invoke(): List<Quote> {
        val quotes = repository.getAllQuotesFromApi()

        return if (quotes.isNotEmpty()) {
            repository.clearQuotes()
            repository.insertQuotes(quotes.map { it.toDatabase() })
            quotes
        } else {
            repository.getAllQuotesFromDatabase()
        }
    }
}