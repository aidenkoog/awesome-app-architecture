package io.github.aidenkoog.android_wear_os.presentation.base.viewmodel

import androidx.lifecycle.ViewModel

abstract class BaseViewModel : ViewModel() {
    abstract fun getViewModelTag(): String
}