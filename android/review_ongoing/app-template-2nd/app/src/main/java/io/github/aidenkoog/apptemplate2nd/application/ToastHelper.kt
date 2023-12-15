package io.github.aidenkoog.apptemplate2nd.application

import com.zhuinden.eventemitter.EventEmitter
import com.zhuinden.eventemitter.EventSource
import dagger.hilt.android.scopes.ActivityRetainedScoped
import javax.inject.Inject

@ActivityRetainedScoped
class ToastHelper @Inject constructor() {

    private val toastEmitter: EventEmitter<String> = EventEmitter()
    val toastMessages: EventSource<String> = toastEmitter

    fun sendToast(message: String) {
        toastEmitter.emit(message)
    }
}