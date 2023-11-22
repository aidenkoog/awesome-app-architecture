package io.github.aidenkoog.news_list.di.component

import android.content.Context
import dagger.Component
import io.github.aidenkoog.news_list.CustomApplication
import io.github.aidenkoog.news_list.data.api.NetworkService
import io.github.aidenkoog.news_list.data.repository.TopHeadlineRepository
import io.github.aidenkoog.news_list.di.ApplicationContext
import io.github.aidenkoog.news_list.di.module.ApplicationModule
import javax.inject.Singleton

@Singleton
@Component(modules = [ApplicationModule::class])
interface ApplicationComponent {

    fun inject(application: CustomApplication)

    @ApplicationContext
    fun getContext(): Context

    fun getNetworkService(): NetworkService

    fun getTopHeadlineRepository(): TopHeadlineRepository
}