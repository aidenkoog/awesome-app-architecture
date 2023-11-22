package io.github.aidenkoog.testapp.presentation.base

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class BaseActivity: AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onDestroy() {
        super.onDestroy()
    }
}