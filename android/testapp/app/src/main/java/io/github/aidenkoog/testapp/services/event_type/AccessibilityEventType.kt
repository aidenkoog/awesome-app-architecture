package io.github.aidenkoog.testapp.services.event_type

import android.view.accessibility.AccessibilityEvent

enum class AccessibilityEventType {
    VIEW_TEXT_CHANGED {             // 16
        override fun getType() = "TYPE_VIEW_TEXT_CHANGED"
        override fun getId() = AccessibilityEvent.TYPE_VIEW_TEXT_CHANGED
    },

    WINDOW_STATE_CHANGED {          // 32
        override fun getType() = "TYPE_WINDOW_STATE_CHANGED"
        override fun getId() = AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED
    },

    NOTIFICATION_STATE_CHANGED {    // 64
        override fun getType() = "TYPE_NOTIFICATION_STATE_CHANGED"
        override fun getId() = AccessibilityEvent.TYPE_NOTIFICATION_STATE_CHANGED
    },

    WINDOW_CONTENT_CHANGED {        // 2048
        override fun getType() = "TYPE_WINDOW_CONTENT_CHANGED"
        override fun getId() = AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED
    },

    VIEW_SCROLLED {                 // 4096
        override fun getType() = "TYPE_VIEW_SCROLLED"
        override fun getId() = AccessibilityEvent.TYPE_VIEW_SCROLLED
    };

    abstract fun getType(): String
    abstract fun getId(): Int
}