package io.github.aidenkoog.android_wear_os.app

import android.app.Activity
import android.app.Application
import android.content.Context
import android.os.Bundle
import androidx.multidex.MultiDex
import com.orhanobut.logger.AndroidLogAdapter
import com.orhanobut.logger.FormatStrategy
import com.orhanobut.logger.Logger
import com.orhanobut.logger.PrettyFormatStrategy
import dagger.hilt.android.HiltAndroidApp
import io.github.aidenkoog.android_wear_os.BuildConfig
import io.github.aidenkoog.android_wear_os.utils.constants.Constants.LOGGER_TAG
import io.reactivex.exceptions.UndeliverableException
import io.reactivex.plugins.RxJavaPlugins
import java.io.IOException
import java.net.SocketException

@HiltAndroidApp
class MainApplication : Application(), Application.ActivityLifecycleCallbacks {

    companion object {
        private const val TAG: String = LOGGER_TAG
        private var isBackground = false
    }

    override fun onCreate() {
        super.onCreate()

        /**
         * Android runs on top of JVM-based ART.
         * To run on top of ART, Android code is compiled into dex files.
         * The number of methods cannot exceed 64k (65536).
         * Multidex splits a dex file into several pieces
         * so that the number of methods does not exceed 64k (65536),
         * and allows the split dex to be read.
         */
        MultiDex.install(this)
        loadLoggerFeature()
        registerActivityLifecycleCallbacks(this)
        hookRxError()
    }

    private fun loadLoggerFeature() {
        val formatStrategy: FormatStrategy = PrettyFormatStrategy.newBuilder().tag(TAG).build()
        Logger.addLogAdapter(object : AndroidLogAdapter(formatStrategy) {
            override fun isLoggable(priority: Int, tag: String?): Boolean {
                return BuildConfig.DEBUG
            }
        })
    }

    override fun attachBaseContext(base: Context) {
        super.attachBaseContext(base)
        MultiDex.install(this)
    }

    override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) {
    }

    override fun onActivityStarted(activity: Activity) {
    }

    override fun onActivityResumed(activity: Activity) {
        Logger.d("foreground")
        isBackground = false
    }

    override fun onActivityPaused(activity: Activity) {
        Logger.d("background")
        isBackground = true
    }

    override fun onActivityStopped(activity: Activity) {
    }

    override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) {
    }

    override fun onActivityDestroyed(activity: Activity) {
    }

    private fun hookRxError() {
        RxJavaPlugins.setErrorHandler { e ->
            if (e is UndeliverableException) {
                Logger.e("Rx UndeliverableException occurs, e: ${e.localizedMessage} !!!")
                return@setErrorHandler
            }
            if ((e is IOException) || (e is SocketException)) {
                // fine, irrelevant network problem or API that throws on cancellation
                return@setErrorHandler
            }
            if (e is InterruptedException) {
                // fine, some blocking code was interrupted by a dispose call
                return@setErrorHandler
            }
            if ((e is NullPointerException) || (e is IllegalArgumentException)) {
                // that's likely a bug in the application
                Thread.currentThread().uncaughtExceptionHandler?.uncaughtException(
                    Thread.currentThread(), e
                )
                return@setErrorHandler
            }
            if (e is IllegalStateException) {
                // that's a bug in RxJava or in a custom operator
                Thread.currentThread().uncaughtExceptionHandler?.uncaughtException(
                    Thread.currentThread(), e
                )
                return@setErrorHandler
            }
            Logger.e("RxJava_HOOK: Undeliverable exception received, not sure what to do")
        }
    }
}