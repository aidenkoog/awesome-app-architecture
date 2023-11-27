package io.github.aidenkoog.apptemplate.presentation.home

import android.os.Bundle
import androidx.databinding.DataBindingUtil
import dagger.hilt.android.AndroidEntryPoint
import io.github.aidenkoog.apptemplate.R
import io.github.aidenkoog.apptemplate.databinding.HomeMainBinding
import io.github.aidenkoog.apptemplate.extensions.setOnSingleClickListener
import io.github.aidenkoog.apptemplate.presentation.base.BaseActivity

@AndroidEntryPoint
class MainActivity : BaseActivity() {

    private lateinit var binding: HomeMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        /**
         * data binding with layout in which layout tag exists.
         */
        binding = DataBindingUtil.setContentView<HomeMainBinding>(
            this, R.layout.home_main
        ).also {
            setContentView(it.root)
        }

        /**
         * custom single click listener for handling continous key events.
         */
        binding.homeBtn.setOnSingleClickListener {
            showToast(getString(R.string.btn_click_test_toast_msg))
        }
    }
}