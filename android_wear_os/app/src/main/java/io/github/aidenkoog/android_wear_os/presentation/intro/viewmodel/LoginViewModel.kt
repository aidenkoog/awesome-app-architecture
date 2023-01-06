package io.github.aidenkoog.android_wear_os.presentation.intro.viewmodel

import androidx.lifecycle.MutableLiveData
import io.github.aidenkoog.android_wear_os.presentation.base.viewmodel.BaseViewModel

class LoginViewModel : BaseViewModel(){

    val isLoaded = MutableLiveData<Boolean>()

    init {
        isLoaded.value = false
    }

    override fun getViewModelTag(): String {
        return LoginViewModel::class.java.simpleName
    }
}