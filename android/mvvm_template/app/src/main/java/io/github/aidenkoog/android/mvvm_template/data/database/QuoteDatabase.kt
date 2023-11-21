package io.github.aidenkoog.android.mvvm_template.data.database

import androidx.room.Database
import androidx.room.RoomDatabase
import io.github.aidenkoog.android.mvvm_template.data.database.dao.QuoteDao
import io.github.aidenkoog.android.mvvm_template.data.database.entities.QuoteEntity

@Database(entities = [QuoteEntity::class], version = 1)
abstract class QuoteDatabase: RoomDatabase() {

    abstract fun getQuoteDao():QuoteDao
}