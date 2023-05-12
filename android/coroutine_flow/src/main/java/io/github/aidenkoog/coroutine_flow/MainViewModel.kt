package io.github.aidenkoog.coroutine_flow

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableSharedFlow

class MainViewModel : ViewModel() {
    private val actionSharedFlow = MutableSharedFlow<MainAction>()

    fun testFunction() {
        
    }

}

enum class MainAction {
    START, PAUSE, RESET
}