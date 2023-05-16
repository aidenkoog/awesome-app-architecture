package io.github.aidenkoog.android_wear_os.presentation.home.viewmodel.hidden

import androidx.lifecycle.MutableLiveData
import dagger.hilt.android.lifecycle.HiltViewModel
import io.github.aidenkoog.android_wear_os.presentation.base.viewmodel.BaseViewModel
import javax.inject.Inject

@HiltViewModel
class HiddenViewModel @Inject constructor() : BaseViewModel() {

    val isLoaded = MutableLiveData<Boolean>()

    init {
        isLoaded.value = false
    }

    override fun getViewModelTag(): String {
        return HiddenViewModel::class.java.simpleName
    }
}