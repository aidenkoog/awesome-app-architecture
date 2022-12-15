package io.github.aidenkoog.android.presentation.intro

import io.github.aidenkoog.android.presentation.base.viewmodel.BaseViewModel

class LoginActivityViewModel : BaseViewModel() {
    override fun getViewModelTag(): String {
        return LoginActivityViewModel::class.java.simpleName
    }
}