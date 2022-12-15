package io.github.aidenkoog.android.presentation.base.viewmodel

import androidx.lifecycle.ViewModel

abstract class BaseViewModel : ViewModel() {
    abstract fun getViewModelTag(): String
}