package io.github.aidenkoog.apptemplate.di.app

import android.content.Context
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import io.github.aidenkoog.apptemplate.CustomApplication


@Module
@InstallIn(SingletonComponent::class)
class AppModule {
    @Provides
    fun provideApp(@ApplicationContext context: Context): CustomApplication =
        context as CustomApplication
}