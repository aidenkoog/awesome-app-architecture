package io.github.aidenkoog.android_wear_os.presentation.intro.activity

import android.app.NotificationManager
import android.content.Context
import android.os.Bundle
import io.github.aidenkoog.android_wear_os.BuildConfig
import io.github.aidenkoog.android_wear_os.R
import io.github.aidenkoog.android_wear_os.presentation.base.activity.BaseActivity
import io.github.aidenkoog.android_wear_os.utils.utils.FileLogUtil

class IntroActivity: BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_intro)

        @Suppress("KotlinConstantConditions")
        if (BuildConfig.BUILD_TYPE != "release") {
            FileLogUtil.saveFileLog(this)
        }
        val notificationManager =
            getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.cancelAll()
    }
}