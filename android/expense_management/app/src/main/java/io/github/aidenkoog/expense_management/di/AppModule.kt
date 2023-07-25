package io.github.aidenkoog.expense_management.di

import io.github.aidenkoog.expense_management.common.Constants
import io.github.aidenkoog.expense_management.data.remote.ExpenseApi
import io.github.aidenkoog.expense_management.data.repository.ExpenseRepositoryImpl
import io.github.aidenkoog.expense_management.domain.repository.ExpenseRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)

object AppModule {

    @Provides
    @Singleton
    fun provideExpensesApi(): ExpenseApi {
        return Retrofit.Builder()
            .baseUrl(Constants.BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ExpenseApi::class.java)
    }

    @Provides
    @Singleton
    fun provideRepository(newsApi: ExpenseApi): ExpenseRepository {
        return ExpenseRepositoryImpl(newsApi)
    }


}