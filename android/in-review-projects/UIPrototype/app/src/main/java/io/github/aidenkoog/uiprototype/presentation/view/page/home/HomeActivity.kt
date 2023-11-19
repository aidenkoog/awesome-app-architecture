package io.github.aidenkoog.uiprototype.presentation.view.page.home

import android.os.Bundle
import io.github.aidenkoog.uiprototype.presentation.view.page.BaseActivity
import io.github.aidenkoog.uiprototype.databinding.HomeMainBinding

class HomeActivity : BaseActivity() {

    private val binding: HomeMainBinding by lazy { HomeMainBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
    }
}