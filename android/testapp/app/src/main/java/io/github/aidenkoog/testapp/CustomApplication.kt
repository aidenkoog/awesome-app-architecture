package io.github.aidenkoog.testapp

import android.app.Application
import com.orhanobut.logger.AndroidLogAdapter
import com.orhanobut.logger.FormatStrategy
import com.orhanobut.logger.Logger
import com.orhanobut.logger.PrettyFormatStrategy

class CustomApplication : Application() {

    companion object {
        private const val TAG: String = "AidenKooG"
    }

    override fun onCreate() {
        super.onCreate()
        loadLoggerFeature()
    }

    private fun loadLoggerFeature() {
        val formatStrategy: FormatStrategy = PrettyFormatStrategy.newBuilder().tag(TAG).build()
        Logger.addLogAdapter(object : AndroidLogAdapter(formatStrategy) {
            override fun isLoggable(priority: Int, tag: String?): Boolean {
                return true
            }
        })
    }
}