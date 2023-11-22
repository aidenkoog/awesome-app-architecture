package io.github.aidenkoog.uiprototype.presentation.view.page.login

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import io.github.aidenkoog.uiprototype.presentation.view.page.BaseFragment
import io.github.aidenkoog.uiprototype.databinding.FmtLoginMainBinding
import io.github.aidenkoog.uiprototype.presentation.viewmodel.LoginViewModel

class LoginFragment : BaseFragment() {

    private val binding: FmtLoginMainBinding by lazy {
        FmtLoginMainBinding.inflate(layoutInflater)
    }
    private val viewModel: LoginViewModel by lazy { LoginViewModel() }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View? {
        binding.viewModel = viewModel
        return super.onCreateView(inflater, container, savedInstanceState)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        observeStates()
    }

    override fun observeStates() {
        viewModel.loginKaKaoAccount.observe(viewLifecycleOwner) { event ->
            if (!event) return@observe
        }
        viewModel.loginGoogleAccount.observe(viewLifecycleOwner) { event ->
            if (!event) return@observe
        }
    }
}