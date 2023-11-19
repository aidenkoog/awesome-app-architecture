package io.github.aidenkoog.news_list

import android.app.Application
import io.github.aidenkoog.news_list.di.component.ApplicationComponent
import io.github.aidenkoog.news_list.di.component.DaggerApplicationComponent
import io.github.aidenkoog.news_list.di.module.ApplicationModule

class CustomApplication : Application() {

    lateinit var applicationComponent: ApplicationComponent

    override fun onCreate() {
        super.onCreate()
        injectDependencies()
    }

    private fun injectDependencies() {
        applicationComponent = DaggerApplicationComponent
            .builder()
            .applicationModule(ApplicationModule(this))
            .build()

        applicationComponent.inject(this)
    }
}