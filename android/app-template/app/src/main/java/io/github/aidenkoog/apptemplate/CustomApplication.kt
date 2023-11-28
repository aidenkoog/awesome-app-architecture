package io.github.aidenkoog.apptemplate

import android.app.Activity
import android.app.Application
import android.content.Intent
import android.os.Bundle
import dagger.hilt.android.HiltAndroidApp
import io.github.aidenkoog.apptemplate.infrastructure.ActivityLifecycleCallback
import timber.log.Timber

@HiltAndroidApp
class CustomApplication : Application(), Application.ActivityLifecycleCallbacks {

    private var isBackground = false

    override fun onCreate() {
        super.onCreate()
        /*
         * initialize timber logger.
         */
        Timber.plant(Timber.DebugTree())

        // register activity's custom lifecycle.
        // registerActivityLifecycleCallbacks(ActivityLifecycleCallback())
    }

    private fun handleSignOutEvent() {
        val intent = Intent("").apply { putExtra("reason", "") }
        applicationContext.sendBroadcast(intent)
    }

    override fun onActivityCreated(activity: Activity, bundle: Bundle?) {
        Timber.i("onActivityCreated:")
    }

    override fun onActivityStarted(activity: Activity) {
        Timber.i("onActivityStarted:")
    }

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

    override fun onActivityStopped(activity: Activity) {
        Timber.i("onActivityStopped:")
    }

    override fun onActivitySaveInstanceState(activity: Activity, bundle: Bundle) {
        Timber.i("onActivitySaveInstanceState:")
    }

    override fun onActivityDestroyed(activity: Activity) {
        Timber.i("onActivityDestroyed:")
    }
}