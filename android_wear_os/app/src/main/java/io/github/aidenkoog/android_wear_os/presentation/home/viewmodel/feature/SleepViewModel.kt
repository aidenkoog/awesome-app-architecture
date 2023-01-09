package io.github.aidenkoog.android_wear_os.presentation.home.viewmodel.feature

import androidx.lifecycle.MutableLiveData
import io.github.aidenkoog.android_wear_os.presentation.base.viewmodel.BaseViewModel

class SleepViewModel: BaseViewModel() {

    val isLoaded = MutableLiveData<Boolean>()

    init {
        isLoaded.value = false
    }

    override fun getViewModelTag(): String {
        return SleepViewModel::class.java.simpleName
    }
}