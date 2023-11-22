package io.github.aidenkoog.uiprototype.presentation.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData

class LoginViewModel : BaseViewModel() {

    private val _loginKaKaoAccount: MutableLiveData<Boolean> = MutableLiveData()
    val loginKaKaoAccount: LiveData<Boolean> = _loginKaKaoAccount

    private val _loginGoogleAccount: MutableLiveData<Boolean> = MutableLiveData()
    val loginGoogleAccount: LiveData<Boolean> = _loginGoogleAccount

    fun onLoginKaKaoAccount() = _loginKaKaoAccount.postValue(true)

    fun onLoginGoogleAccount() = _loginGoogleAccount.postValue(true)
}