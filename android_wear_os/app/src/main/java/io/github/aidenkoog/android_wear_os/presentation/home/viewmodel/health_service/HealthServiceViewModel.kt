package io.github.aidenkoog.android_wear_os.presentation.home.viewmodel.health_service

import android.os.Bundle
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import io.github.aidenkoog.android_wear_os.presentation.base.viewmodel.BaseViewModel
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class HealthServiceViewModel @Inject constructor() : BaseViewModel() {

    val isLoaded = MutableLiveData<Boolean>()

    init {
        isLoaded.value = false
    }

    private val _ambientEventChannel = Channel<AmbientEvent>(capacity = Channel.CONFLATED)
    val ambientEventFlow = _ambientEventChannel.receiveAsFlow()

    private val _keyPressChannel = Channel<Unit>(capacity = Channel.CONFLATED)
    val keyPressFlow = _keyPressChannel.receiveAsFlow()

    fun sendAmbientEvent(event: AmbientEvent) {
        viewModelScope.launch {
            _ambientEventChannel.send(event)
        }
    }

    fun sendKeyPress() {
        viewModelScope.launch {
            _keyPressChannel.send(Unit)
        }
    }

    override fun getViewModelTag(): String {
        return HealthServiceViewModel::class.java.simpleName
    }
}

sealed class AmbientEvent {
    class Enter(val ambientDetails: Bundle) : AmbientEvent()
    object Exit : AmbientEvent()
    object Update : AmbientEvent()
}