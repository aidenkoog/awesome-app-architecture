package io.github.aidenkoog.eventbus

import android.util.Log
import androidx.databinding.ObservableField
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

class MainViewModel : ViewModel() {

    val textView = ObservableField(false)

    init {
        viewModelScope.launch {
            EventBus.subscribe<Boolean>().collect { value ->
                Log.i("eventBus", "eventValue: $value")
                textView.set(value)
            }
        }
    }
}