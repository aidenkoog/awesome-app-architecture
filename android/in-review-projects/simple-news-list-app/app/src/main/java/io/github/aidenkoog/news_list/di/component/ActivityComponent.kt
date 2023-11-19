package io.github.aidenkoog.news_list.di.component

import dagger.Component
import io.github.aidenkoog.news_list.di.ActivityScope
import io.github.aidenkoog.news_list.di.module.ActivityModule
import io.github.aidenkoog.news_list.ui.topheadline.TopHeadlineActivity

@ActivityScope
@Component(dependencies = [ApplicationComponent::class], modules = [ActivityModule::class])
interface ActivityComponent {

    fun inject(activity: TopHeadlineActivity)
}