package io.github.aidenkoog.android.presentation.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import io.github.aidenkoog.android.domain.model.User
import io.github.aidenkoog.android.domain.usecase.GetUsersUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class UsersViewModel @Inject constructor(private val getUserListUseCase: GetUsersUseCase) :
    ViewModel() {

    val usersReceivedLiveData = MutableLiveData<List<User>>()
    val isLoad = MutableLiveData<Boolean>()
    private val userData = MutableLiveData<User>()

    init {
        isLoad.value = false
    }

    val user: User? get() = userData.value

    fun set(album: User) = run { userData.value = album }

    fun loadUsers() {
        getUserListUseCase.execute(onSuccess = {
            isLoad.value = true
            usersReceivedLiveData.value = it
        }, onError = {
            it.printStackTrace()
        })
    }
}
