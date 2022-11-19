package io.github.aidenkoog.android.presentation.splash

import android.os.Bundle
import android.util.Log
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import dagger.hilt.android.AndroidEntryPoint
import io.github.aidenkoog.android.R
import io.github.aidenkoog.android.databinding.SplashMainBinding

@AndroidEntryPoint
class SplashActivity : AppCompatActivity() {

    private val viewModel: SplashViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val splashMainBinding =
            DataBindingUtil.setContentView<SplashMainBinding>(this, R.layout.splash_main);
        splashMainBinding.splashViewModel = viewModel

        with(viewModel) {
            loadAppInfo()
            isLoaded.observe(this@SplashActivity, {
                Log.d(SplashActivity::class.simpleName, "loaded!");
            })
            appInfoListLiveData.observe(this@SplashActivity, {
                it.let {
                    Log.d(SplashActivity::class.simpleName, "appInfo data exists!");
                }
            })
        }
    }
}