package io.github.aidenkoog.android.presentation.login

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import io.github.aidenkoog.android.domain.model.User
import io.github.aidenkoog.android.domain.usecase.LoginUseCase
import javax.inject.Inject

@HiltViewModel
class LoginViewModel @Inject constructor(
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