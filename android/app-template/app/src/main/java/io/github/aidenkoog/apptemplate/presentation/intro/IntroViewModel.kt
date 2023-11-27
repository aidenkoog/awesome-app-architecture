package io.github.aidenkoog.apptemplate.presentation.intro

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class IntroViewModel @Inject constructor() : ViewModel() {

    private val _introSteps = MutableLiveData<IntroSteps>()
    val introSteps: LiveData<IntroSteps> = _introSteps

    fun startIntroSteps() {
        viewModelScope.launch(Dispatchers.IO) {
            delay(2000)
            withContext(Dispatchers.Main) {
                _introSteps.postValue(IntroSteps.LoginStep)
            }
        }
    }
}