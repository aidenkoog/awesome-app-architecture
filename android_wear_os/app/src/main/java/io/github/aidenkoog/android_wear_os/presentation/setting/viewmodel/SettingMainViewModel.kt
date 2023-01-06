package io.github.aidenkoog.android_wear_os.presentation.setting.viewmodel

import androidx.lifecycle.MutableLiveData
import io.github.aidenkoog.android_wear_os.presentation.base.viewmodel.BaseViewModel

class SettingMainViewModel: BaseViewModel() {

    val isLoaded = MutableLiveData<Boolean>()

    init {
        isLoaded.value = false
    }

    override fun getViewModelTag(): String {
        return SettingMainViewModel::class.java.simpleName
    }
}