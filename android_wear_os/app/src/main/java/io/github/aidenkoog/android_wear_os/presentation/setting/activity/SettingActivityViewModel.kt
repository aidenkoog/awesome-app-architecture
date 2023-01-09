package io.github.aidenkoog.android_wear_os.presentation.setting.activity

import dagger.hilt.android.lifecycle.HiltViewModel
import io.github.aidenkoog.android_wear_os.presentation.base.viewmodel.BaseViewModel
import javax.inject.Inject

@HiltViewModel
class SettingActivityViewModel @Inject constructor() : BaseViewModel() {
    override fun getViewModelTag(): String {
        return SettingActivityViewModel::class.java.simpleName
    }
}