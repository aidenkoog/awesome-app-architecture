package io.github.aidenkoog.android.presentation.login

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import io.github.aidenkoog.android.domain.model.User
import io.github.aidenkoog.android.domain.usecase.LoginUseCase

class LoginViewModel constructor(
    private val loginUseCase: LoginUseCase
) : ViewModel() {

    val userInfoLiveData = MutableLiveData<List<User>>()
    val isLoggedIn = MutableLiveData<Boolean>()

    init {
        isLoggedIn.value = false
    }

    fun requestLogin() {
        loginUseCase.execute(
            onSuccess = {
                isLoggedIn.value = true
                userInfoLiveData.value = it
            },
            onError = {
                it.printStackTrace()
                isLoggedIn.value = true;  // for test
            }
        )
    }
}