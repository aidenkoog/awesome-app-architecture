package io.github.aidenkoog.uiprototype.presentation.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData

class IntroViewModel : BaseViewModel() {

    private val _introLoad: MutableLiveData<Boolean> = MutableLiveData()
    val introLoad: LiveData<Boolean> = _introLoad

    companion object {
        const val INTRO_LOADING_TIME = 2000L
    }
}