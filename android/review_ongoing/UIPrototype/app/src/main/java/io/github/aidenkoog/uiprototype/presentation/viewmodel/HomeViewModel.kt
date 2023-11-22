package io.github.aidenkoog.uiprototype.presentation.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData

class HomeViewModel : BaseViewModel() {
    private val _homeState: MutableLiveData<Boolean> = MutableLiveData()
    val homeState: LiveData<Boolean> = _homeState

    fun updateHomeState() = _homeState.postValue(true)
}