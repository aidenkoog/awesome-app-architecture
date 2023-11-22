package io.github.aidenkoog.uiprototype.presentation.view.page.intro

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import io.github.aidenkoog.uiprototype.presentation.view.page.BaseFragment
import io.github.aidenkoog.uiprototype.databinding.FmtIntroMainBinding
import io.github.aidenkoog.uiprototype.presentation.viewmodel.IntroViewModel
import io.github.aidenkoog.uiprototype.presentation.view.page.login.LoginActivity
import io.github.aidenkoog.uiprototype.util.activity.ActivityUtil

class IntroFragment : BaseFragment() {

    private val binding: FmtIntroMainBinding by lazy {
        FmtIntroMainBinding.inflate(layoutInflater)
    }
    private val viewModel: IntroViewModel by lazy { IntroViewModel() }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View? {
        binding.viewModel = viewModel
        return super.onCreateView(inflater, container, savedInstanceState)
    }

    override fun observeStates() {
        super.observeStates()

        viewModel.introLoad.observe(viewLifecycleOwner) { event ->
            if (!event) return@observe
            try {
                ActivityUtil.startActivity(requireContext(), LoginActivity::class.java)
                ActivityUtil.finishActivity(::finishActivity)
            } catch (e: IllegalStateException) {
                e.printStackTrace()
            }
        }
    }
}