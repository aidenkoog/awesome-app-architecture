package io.github.aidenkoog.android.presentation.intro

import io.github.aidenkoog.android.presentation.base.viewmodel.BaseViewModel

class IntroViewModel : BaseViewModel() {
    override fun getViewModelTag(): String {
        return IntroViewModel::class.java.simpleName
    }
}