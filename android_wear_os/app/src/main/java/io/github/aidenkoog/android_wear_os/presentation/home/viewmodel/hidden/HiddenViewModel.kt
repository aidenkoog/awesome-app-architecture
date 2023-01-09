package io.github.aidenkoog.android_wear_os.presentation.home.viewmodel.hidden

import androidx.lifecycle.MutableLiveData
import io.github.aidenkoog.android_wear_os.presentation.base.viewmodel.BaseViewModel

class HiddenViewModel: BaseViewModel() {

    val isLoaded = MutableLiveData<Boolean>()

    init {
        isLoaded.value = false
    }

    override fun getViewModelTag(): String {
        return HiddenViewModel::class.java.simpleName
    }
}