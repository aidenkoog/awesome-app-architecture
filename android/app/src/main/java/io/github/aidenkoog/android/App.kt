package io.github.aidenkoog.android

import android.annotation.SuppressLint
import android.app.Activity
import android.app.Application
import android.content.Context
import android.os.Bundle
import com.orhanobut.logger.AndroidLogAdapter
import com.orhanobut.logger.FormatStrategy
import com.orhanobut.logger.Logger
import com.orhanobut.logger.PrettyFormatStrategy
import io.reactivex.exceptions.UndeliverableException
import io.reactivex.plugins.RxJavaPlugins
import java.io.IOException
import java.net.SocketException

@Suppress("KotlinConstantConditions")
class App : Application(), Application.ActivityLifecycleCallbacks {
    companion object {
        private const val TAG: String = "App"

        @SuppressLint("StaticFieldLeak")
        var context: Context? = null
        var isBackground = false
    }

    override fun onCreate() {
        super.onCreate()
        context = applicationContext

        val formatStrategy: FormatStrategy = PrettyFormatStrategy.newBuilder().tag(TAG).build()
        Logger.addLogAdapter(object : AndroidLogAdapter(formatStrategy) {
            override fun isLoggable(priority: Int, tag: String?): Boolean {
                return BuildConfig.DEBUG
            }
        })
        registerActivityLifecycleCallbacks(this)
        hookRxError()
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
                Thread.currentThread().uncaughtExceptionHandler
                    ?.uncaughtException(Thread.currentThread(), e)
                return@setErrorHandler
            }
            if (e is IllegalStateException) {
                // that's a bug in RxJava or in a custom operator
                Thread.currentThread().uncaughtExceptionHandler
                    ?.uncaughtException(Thread.currentThread(), e)
                return@setErrorHandler
            }
            Logger.e("RxJava_HOOK: Undeliverable exception received, not sure what to do")
        }
    }

    override fun attachBaseContext(base: Context?) {
        super.attachBaseContext(base)
    }

    override fun onActivityCreated(activity: Activity, bundle: Bundle?) {

    }

    override fun onActivityStarted(activity: Activity) {

    }

    override fun onActivityResumed(activity: Activity) {
        isBackground = false
    }

    override fun onActivityPaused(activity: Activity) {
        isBackground = true
    }

    override fun onActivityStopped(activity: Activity) {

    }

    override fun onActivitySaveInstanceState(activity: Activity, bundle: Bundle) {

    }

    override fun onActivityDestroyed(activity: Activity) {

    }

    override fun onTerminate() {
        super.onTerminate()
        unregisterActivityLifecycleCallbacks(this)
    }
}