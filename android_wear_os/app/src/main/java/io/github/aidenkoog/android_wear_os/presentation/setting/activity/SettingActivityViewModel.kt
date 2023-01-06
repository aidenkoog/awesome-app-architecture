package io.github.aidenkoog.android_wear_os.presentation.setting.activity

import io.github.aidenkoog.android_wear_os.presentation.base.viewmodel.BaseViewModel

class SettingActivityViewModel: BaseViewModel() {
    override fun getViewModelTag(): String {
        return SettingActivityViewModel::class.java.simpleName
    }
}