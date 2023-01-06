package io.github.aidenkoog.android_wear_os.presentation.home.activity

import io.github.aidenkoog.android_wear_os.presentation.base.viewmodel.BaseViewModel

class HomeActivityViewModel: BaseViewModel() {
    override fun getViewModelTag(): String {
        return HomeActivityViewModel::class.java.simpleName
    }
}