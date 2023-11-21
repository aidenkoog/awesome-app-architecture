package io.github.aidenkoog.android.mvvm_template.data

import io.github.aidenkoog.android.mvvm_template.data.database.dao.QuoteDao
import io.github.aidenkoog.android.mvvm_template.data.database.entities.QuoteEntity
import io.github.aidenkoog.android.mvvm_template.data.model.QuoteModel
import io.github.aidenkoog.android.mvvm_template.data.network.QuoteService
import io.github.aidenkoog.android.mvvm_template.domain.model.Quote
import io.github.aidenkoog.android.mvvm_template.domain.model.toDomain
import javax.inject.Inject

class QuoteRepository @Inject constructor(
    private val api: QuoteService, private val quoteDao: QuoteDao
) {

    suspend fun getAllQuotesFromApi(): List<Quote> {
        val response: List<QuoteModel> = api.getQuotes()
        return response.map { it.toDomain() }
    }

    suspend fun getAllQuotesFromDatabase(): List<Quote> {
        val response: List<QuoteEntity> = quoteDao.getAllQuotes()
        return response.map { it.toDomain() }
    }

    suspend fun insertQuotes(quotes: List<QuoteEntity>) {
        quoteDao.insertAll(quotes)
    }

    suspend fun clearQuotes() {
        quoteDao.deleteAllQuotes()
    }
}