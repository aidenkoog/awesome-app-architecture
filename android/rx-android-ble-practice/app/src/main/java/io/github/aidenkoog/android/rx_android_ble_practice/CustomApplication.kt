package io.github.aidenkoog.android.rx_android_ble_practice

import android.app.Activity
import android.app.Application
import android.content.Intent
import android.os.Bundle
import dagger.hilt.android.HiltAndroidApp
import timber.log.Timber
import java.util.Locale

@HiltAndroidApp
class CustomApplication : Application(), Application.ActivityLifecycleCallbacks {

    private var isBackground = false

    override fun onCreate() {
        super.onCreate()

        Timber.plant(object : Timber.DebugTree() {
            override fun createStackElementTag(element: StackTraceElement): String {
                return String.format(
                    Locale.US,
                    "%s(%s:%d)",
                    super.createStackElementTag(element),
                    element.fileName,
                    element.lineNumber
                )
            }
        })
    }

    private fun handleSignOutEvent() {
        val intent = Intent("").apply { putExtra("reason", "") }
        applicationContext.sendBroadcast(intent)
    }

    override fun onActivityCreated(activity: Activity, bundle: Bundle?) =
        Timber.i("onActivityCreated:")

    override fun onActivityStarted(activity: Activity) = Timber.i("onActivityStarted:")

    override fun onActivityResumed(activity: Activity) {
        Timber.i("onActivityResumed:")
        if (isBackground) {

            /*
             * handle login session.
             */
            val needSignOut = false
            if (needSignOut) {
                handleSignOutEvent()
                return
            }

            /*
             * handle varius events in addition to login.
             */
            val needEtcProcess = false
            if (needEtcProcess) {
                return
            }
        }
        isBackground = false
    }

    override fun onActivityPaused(activity: Activity) {
        Timber.i("onActivityPaused:")
        isBackground = true
    }

    override fun onActivityStopped(activity: Activity) = Timber.i("onActivityStopped:")

    override fun onActivitySaveInstanceState(activity: Activity, bundle: Bundle) =
        Timber.i("onActivitySaveInstanceState:")

    override fun onActivityDestroyed(activity: Activity) = Timber.i("onActivityDestroyed:")
}