package io.github.aidenkoog.android.presentation.intro.login.fragment

import android.os.Bundle
import android.text.Editable
import android.text.InputFilter
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.viewModels
import com.orhanobut.logger.Logger
import io.github.aidenkoog.android.BR
import io.github.aidenkoog.android.databinding.FragmentLoginBinding
import io.github.aidenkoog.android.presentation.base.fragment.BaseFragment
import io.github.aidenkoog.android.presentation.intro.login.viewmodel.LoginViewModel

@Suppress("ControlFlowWithEmptyBody")
class LoginFragment : BaseFragment() {

    private var viewDataBinding: FragmentLoginBinding? = null
    private val viewModelData: LoginViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setDataObserver()
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        viewDataBinding = FragmentLoginBinding.inflate(inflater, container, false)
        viewDataBinding?.setVariable(BR.loginViewModel, viewModelData)
        viewDataBinding?.executePendingBindings()

        registerBackPressedCallback()
        initView()

        return viewDataBinding!!.root
    }

    override fun onHandleBackPressed() {
        super.onHandleBackPressed()
        handleBack()
    }

    private fun handleBack() {

    }

    private fun initView() {
        viewDataBinding?.idEdit?.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(charSequence: CharSequence?, p1: Int, p2: Int, p3: Int) {
            }

            override fun onTextChanged(charSequence: CharSequence?, p1: Int, p2: Int, p3: Int) {
                viewDataBinding?.loginButton?.isEnabled = isLoginButtonActive()
            }

            override fun afterTextChanged(editable: Editable?) {
            }
        })

        viewDataBinding?.pwEdit?.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(charSequence: CharSequence?, p1: Int, p2: Int, p3: Int) {
            }

            override fun onTextChanged(charSequence: CharSequence?, p1: Int, p2: Int, p3: Int) {
                viewDataBinding?.loginButton?.isEnabled = isLoginButtonActive()
            }

            override fun afterTextChanged(editable: Editable?) {
            }
        })

        viewDataBinding?.idEdit?.setOnFocusChangeListener { _, focused ->
            if (!focused) {
                val userId = viewDataBinding?.idEdit?.text.toString()
                val trimmedUserId = userId.replace("\\s".toRegex(), "")
                Logger.d("userId: $userId, trimmedUserId: $trimmedUserId")
                viewDataBinding?.idEdit?.setText(trimmedUserId)
            }
        }
        viewDataBinding?.pwEdit?.filters = viewDataBinding?.pwEdit?.filters.let {
            it!! + InputFilter { source, _, _, _, _, _ ->
                source.filterNot { char -> char.isWhitespace() }
            }
        }
        viewDataBinding?.pwEdit?.setOnFocusChangeListener { _, focused ->
            if (!focused) {
                val userPw = viewDataBinding?.pwEdit?.text.toString()
                val trimmedUserPw = userPw.replace("\\s".toRegex(), "")
                Logger.d("userPw: $userPw, trimmedUserPw: $trimmedUserPw")
                viewDataBinding?.pwEdit?.setText(trimmedUserPw)
            }
        }
    }

    private fun isLoginButtonActive(): Boolean {
        return viewDataBinding?.idEdit?.text?.length != 0 && viewDataBinding?.pwEdit?.text?.length != 0
    }

    private fun setDataObserver() {
        viewModelData.isSignUp.observe(this) {
            if (it == true) {
            }
        }
        viewModelData.isLoggedIn.observe(this) {
            if (it == false) {
                return@observe
            }
        }

        viewModelData.isBackIconClick.observe(this) {
            if (it == false) {
                return@observe
            }
            handleBack()
        }

        viewModelData.isLoggedData.observe(this) {
            Logger.d(it)
        }

        viewModelData.isFindId.observe(this) {
            if (it == false) {
                return@observe
            }
        }

        viewModelData.isFindPw.observe(this) {
            if (it == false) {
                return@observe
            }
        }

        viewModelData.isBackIconClick.observe(this) {
            if (it == true) {
            }
        }

        viewModelData.isError.observe(this) {
        }
    }
}