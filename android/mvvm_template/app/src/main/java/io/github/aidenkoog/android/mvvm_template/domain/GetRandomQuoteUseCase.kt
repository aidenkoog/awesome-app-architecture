package io.github.aidenkoog.android.mvvm_template.domain

import io.github.aidenkoog.android.mvvm_template.data.QuoteRepository
import io.github.aidenkoog.android.mvvm_template.data.model.QuoteModel
import io.github.aidenkoog.android.mvvm_template.domain.model.Quote
import javax.inject.Inject

class GetRandomQuoteUseCase @Inject constructor(private val repository: QuoteRepository) {

    suspend operator fun invoke(): Quote? {
        val quotes = repository.getAllQuotesFromDatabase()
        if (!quotes.isNullOrEmpty()) {
            val randomNumber = (quotes.indices).random()
            return quotes[randomNumber]
        }
        return null
    }
}