package io.github.aidenkoog.android_wear_os.presentation.home.activity

import android.os.Bundle
import dagger.hilt.android.AndroidEntryPoint
import io.github.aidenkoog.android_wear_os.R
import io.github.aidenkoog.android_wear_os.presentation.base.activity.BaseActivity

@AndroidEntryPoint
class HomeActivity : BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
    }
}