package io.github.aidenkoog.android_wear_os.presentation.home.viewmodel

import androidx.lifecycle.MutableLiveData
import dagger.hilt.android.lifecycle.HiltViewModel
import io.github.aidenkoog.android_wear_os.domain.usecases.SendSosUseCase
import io.github.aidenkoog.android_wear_os.presentation.base.viewmodel.BaseViewModel
import javax.inject.Inject

@HiltViewModel
class HomeMainViewModel @Inject constructor(
    private val sendSosUseCase: SendSosUseCase
) : BaseViewModel() {

    val isLoaded = MutableLiveData<Boolean>()

    init {
        isLoaded.value = false
    }

    override fun getViewModelTag(): String {
        return HomeMainViewModel::class.java.simpleName
    }

    fun sendSos() {
        sendSosUseCase.execute()
    }
}