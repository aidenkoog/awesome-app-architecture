package io.github.aidenkoog.android_wear_os.di

import android.app.Application
import androidx.room.Room
import io.github.aidenkoog.android_wear_os.data.sources.local.AppDatabase
import io.github.aidenkoog.android_wear_os.data.sources.local.dao.AppDao
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
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
    internal fun providePhotoDao(appDatabase: AppDatabase): AppDao {
        return appDatabase.appDao
    }
}
