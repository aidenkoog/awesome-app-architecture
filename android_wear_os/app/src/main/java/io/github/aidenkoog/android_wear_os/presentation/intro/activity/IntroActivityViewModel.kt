package io.github.aidenkoog.android_wear_os.presentation.intro.activity

import io.github.aidenkoog.android_wear_os.presentation.base.viewmodel.BaseViewModel

class IntroActivityViewModel: BaseViewModel() {
    override fun getViewModelTag(): String {
        return IntroActivityViewModel::class.java.simpleName
    }
}