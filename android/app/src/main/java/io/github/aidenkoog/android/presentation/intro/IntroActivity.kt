package io.github.aidenkoog.android.presentation.intro

import android.app.NotificationManager
import android.content.Context
import android.os.Bundle
import io.github.aidenkoog.android.BuildConfig
import io.github.aidenkoog.android.R
import io.github.aidenkoog.android.presentation.base.activity.BaseActivity
import io.github.aidenkoog.android.util.FileLogUtil

@Suppress("KotlinConstantConditions")
class IntroActivity : BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_intro)

        if (BuildConfig.BUILD_TYPE != "release") {
            FileLogUtil.saveFileLog(this)
        }
        val notificationManager =
            getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.cancelAll()
    }
}
