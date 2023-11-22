package io.github.aidenkoog.news_list.di.module

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import dagger.Module
import dagger.Provides
import io.github.aidenkoog.news_list.data.repository.TopHeadlineRepository
import io.github.aidenkoog.news_list.di.ActivityContext
import io.github.aidenkoog.news_list.ui.base.ViewModelProviderFactory
import io.github.aidenkoog.news_list.ui.topheadline.TopHeadlineAdapter
import io.github.aidenkoog.news_list.ui.topheadline.TopHeadlineViewModel

@Module
class ActivityModule(private val activity: AppCompatActivity) {

    @ActivityContext
    @Provides
    fun provideContext(): Context {
        return activity
    }

    @Provides
    fun provideTopHeadlineViewModel(
        topHeadlineRepository: TopHeadlineRepository): TopHeadlineViewModel {

        return ViewModelProvider(activity,
            ViewModelProviderFactory(TopHeadlineViewModel::class) {
                TopHeadlineViewModel(topHeadlineRepository)
            })[TopHeadlineViewModel::class.java]
    }

    @Provides
    fun provideTopHeadlineAdapter() = TopHeadlineAdapter(ArrayList())
}