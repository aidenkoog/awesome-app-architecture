package io.github.aidenkoog.uiprototype.presentation.viewmodel

import androidx.lifecycle.LifecycleCoroutineScope
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class IntroViewModel : BaseViewModel() {

    private val _introLoad: MutableLiveData<Boolean> = MutableLiveData()
    val introLoad: LiveData<Boolean> = _introLoad

    fun nextStep(coroutineScope: LifecycleCoroutineScope) = CoroutineScope(Dispatchers.IO).launch {
        coroutineScope.launch(Dispatchers.IO) {
            delay(INTRO_LOADING_TIME)
            withContext(Dispatchers.Main) {
                _introLoad.postValue(true)
            }
        }
    }

    companion object {
        const val INTRO_LOADING_TIME = 2000L
    }
}