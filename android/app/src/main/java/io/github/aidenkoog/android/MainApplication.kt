package io.github.aidenkoog.android

import android.app.Application
import android.content.Context
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class MainApplication : Application() {

    override fun onCreate() {
        super.onCreate()
    }

    override fun attachBaseContext(base: Context?) {
        super.attachBaseContext(base)
    }

    override fun onTerminate() {
        super.onTerminate()
    }

    override fun onLowMemory() {
        super.onLowMemory()
    }
}