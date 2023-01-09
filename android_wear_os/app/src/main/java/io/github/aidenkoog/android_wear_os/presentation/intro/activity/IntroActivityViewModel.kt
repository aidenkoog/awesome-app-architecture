package io.github.aidenkoog.android_wear_os.presentation.intro.activity

import dagger.hilt.android.lifecycle.HiltViewModel
import io.github.aidenkoog.android_wear_os.presentation.base.viewmodel.BaseViewModel
import javax.inject.Inject

@HiltViewModel
class IntroActivityViewModel @Inject constructor() : BaseViewModel() {
    override fun getViewModelTag(): String {
        return IntroActivityViewModel::class.java.simpleName
    }
}