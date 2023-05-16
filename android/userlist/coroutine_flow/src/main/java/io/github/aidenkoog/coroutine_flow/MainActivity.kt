package io.github.aidenkoog.coroutine_flow

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.activity.viewModels
import androidx.lifecycle.lifecycleScope
import io.github.aidenkoog.coroutine_flow.databinding.ActivityMainBinding
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.FlowPreview
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach

class MainActivity : AppCompatActivity() {

    @OptIn(FlowPreview::class, ExperimentalCoroutinesApi::class)
    private val viewModel by viewModels<MainViewModel>()
    private val binding by lazy(LazyThreadSafetyMode.NONE) {
        ActivityMainBinding.inflate(
            layoutInflater
        )
    }
    private val mainRenderer by lazy(LazyThreadSafetyMode.NONE) {
        MainRenderer(binding)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        executeStateFlow()
    }

    @OptIn(FlowPreview::class, ExperimentalCoroutinesApi::class)
    private fun executeStateFlow() {
        viewModel.stateFlow.collectIn(this, action = mainRenderer::render)
        mainRenderer.actionFlow().onEach(viewModel::process).launchIn(lifecycleScope)
    }
}