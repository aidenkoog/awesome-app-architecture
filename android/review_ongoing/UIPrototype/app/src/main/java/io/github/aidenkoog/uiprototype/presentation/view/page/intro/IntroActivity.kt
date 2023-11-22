package io.github.aidenkoog.uiprototype.presentation.view.page.intro

import android.os.Bundle
import io.github.aidenkoog.uiprototype.presentation.view.page.BaseActivity
import io.github.aidenkoog.uiprototype.databinding.IntroMainBinding

class IntroActivity : BaseActivity() {

    private val binding: IntroMainBinding by lazy { IntroMainBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
    }
}