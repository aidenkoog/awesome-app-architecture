package io.github.aidenkoog.testapp.services.event_type

import android.view.accessibility.AccessibilityEvent

enum class AccessibilityEventType(val eventType: Int) {

    INPUT_TEXT_CHANGED(AccessibilityEvent.TYPE_VIEW_TEXT_CHANGED),
    WINDOW_STATE_CHANGED(AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED),
    NOTIFICATION_STATE_CHANGED(AccessibilityEvent.TYPE_NOTIFICATION_STATE_CHANGED),
    WINDOW_CONTENT_CHANGED(AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED)
}