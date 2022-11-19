package io.github.aidenkoog.android.presentation.login

import android.os.Bundle
import android.os.PersistableBundle
import android.util.Log
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import dagger.hilt.android.AndroidEntryPoint
import io.github.aidenkoog.android.R
import io.github.aidenkoog.android.databinding.LoginMainBinding

@AndroidEntryPoint
class LoginActivity : AppCompatActivity() {

    private val viewModel: LoginViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?, persistentState: PersistableBundle?) {
        super.onCreate(savedInstanceState, persistentState)

        val loginMainBinding =
            DataBindingUtil.setContentView<LoginMainBinding>(this, R.layout.login_main);
        loginMainBinding.loginViewModel = viewModel

        with(viewModel) {
            requestLogin()
            isLoggedIn.observe(this@LoginActivity, {
                Log.d(LoginActivity::class.simpleName, "loaded!");
            })
            userInfoLiveData.observe(this@LoginActivity, {
                it?.let {
                    Log.d(LoginActivity::class.simpleName, "user data exists!");
                }
            })
        }
    }
}