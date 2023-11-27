package io.github.aidenkoog.apptemplate.presentation.intro

import android.app.Application
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import io.github.aidenkoog.apptemplate.domain.usecase.base.onError
import io.github.aidenkoog.apptemplate.domain.usecase.base.onFailure
import io.github.aidenkoog.apptemplate.domain.usecase.base.onResponse
import io.github.aidenkoog.apptemplate.domain.usecase.feature.GetAppInfoUseCase
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class IntroViewModel @Inject constructor(
    application: Application,
//    private val getAppInfoUseCase: GetAppInfoUseCase
) : ViewModel() {

    private val _introSteps = MutableLiveData<IntroSteps>()
    val introSteps: LiveData<IntroSteps> = _introSteps

    fun startIntroSteps() {
        viewModelScope.launch(Dispatchers.IO) {
            delay(2000)
            _introSteps.postValue(IntroSteps.LoginStep)
        }
    }

    fun getAppInfo() {
        viewModelScope.launch(Dispatchers.IO) {}
    }
}