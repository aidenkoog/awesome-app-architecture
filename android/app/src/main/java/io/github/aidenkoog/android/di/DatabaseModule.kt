package io.github.aidenkoog.android.di

import dagger.Provides
import androidx.room.Room
import android.app.Application
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import io.github.aidenkoog.android.data.source.local.AppDatabase
import io.github.aidenkoog.android.data.source.local.dao.UserDao
import javax.inject.Singleton

@InstallIn(SingletonComponent::class)
@Module
class DatabaseModule {
    @Provides
    @Singleton
    internal fun provideAppDatabase(application: Application): AppDatabase {
        return Room.databaseBuilder(
            application,
            AppDatabase::class.java,
            AppDatabase.DB_NAME
        ).allowMainThreadQueries().build()
    }

    @Provides
    internal fun provideUserDao(appDatabase: AppDatabase): UserDao {
        return appDatabase.userDao
    }
}