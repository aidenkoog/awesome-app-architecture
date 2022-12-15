package io.github.aidenkoog.android.presentation.intro

import android.os.Bundle
import io.github.aidenkoog.android.R
import io.github.aidenkoog.android.presentation.base.activity.BaseActivity
import io.github.aidenkoog.android.util.PreferenceUtil

class LoginActivity : BaseActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val pushDataExtras = intent.extras

        if (pushDataExtras != null) {
            PreferenceUtil.setPrefObject(this, PreferenceUtil.USER_ID, "")
            PreferenceUtil.setPrefObject(this, PreferenceUtil.ACCESS_TOKEN, "")
            PreferenceUtil.setPrefObject(this, PreferenceUtil.REFRESH_TOKEN, "")
        }
    }
}