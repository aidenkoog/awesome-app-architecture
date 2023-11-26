package io.github.aidenkoog.apptemplate

import android.app.Application
import android.content.Intent
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class CustomApplication : Application() {

    private var isBackground = false

    override fun onCreate() {
        super.onCreate()
    }

    override fun onLowMemory() {
        super.onLowMemory()
    }

    override fun onTrimMemory(level: Int) {
        super.onTrimMemory(level)
    }

    fun onActivityPause() {
        isBackground = true
    }

    fun onActivityResume() {
        if (isBackground) {
            val needSignOut = false
            if (needSignOut) {
                handleSignOutEvent()
                return
            }
            val needEtcProcess = false
            if (needEtcProcess) {
                return
            }
        }
        isBackground = false
    }

    private fun handleSignOutEvent() {
        val intent = Intent("").apply { putExtra("reason", "") }
        applicationContext.sendBroadcast(intent)
    }
}