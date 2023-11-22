package io.github.aidenkoog.testapp.services.event_type

import android.view.accessibility.AccessibilityEvent

enum class AccessibilityEventType(val eventType: Int) {

    WINDOW_STATE_CHANGED(AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED),
    WINDOW_CONTENT_CHANGED(AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED)
}