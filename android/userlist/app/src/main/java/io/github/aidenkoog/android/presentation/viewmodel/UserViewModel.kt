package io.github.aidenkoog.android.presentation.viewmodel

import androidx.lifecycle.MutableLiveData
import io.github.aidenkoog.android.domain.model.User

class UserViewModel(val user: User) {

    private val userData = MutableLiveData<User>()

    init {
        userData.value = user
    }
}
