package io.github.aidenkoog.uiprototype.presentation.view.page.login

import android.os.Bundle
import io.github.aidenkoog.uiprototype.presentation.view.page.BaseActivity
import io.github.aidenkoog.uiprototype.databinding.LoginMainBinding

class LoginActivity : BaseActivity() {

    private val binding: LoginMainBinding by lazy { LoginMainBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
    }
}