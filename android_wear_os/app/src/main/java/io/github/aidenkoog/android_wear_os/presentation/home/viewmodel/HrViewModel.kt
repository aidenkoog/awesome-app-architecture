package io.github.aidenkoog.android_wear_os.presentation.home.viewmodel

import androidx.lifecycle.MutableLiveData
import io.github.aidenkoog.android_wear_os.presentation.base.viewmodel.BaseViewModel

class HrViewModel: BaseViewModel() {

    val isLoaded = MutableLiveData<Boolean>()

    init {
        isLoaded.value = false
    }

    override fun getViewModelTag(): String {
        return HrViewModel::class.java.simpleName
    }
}