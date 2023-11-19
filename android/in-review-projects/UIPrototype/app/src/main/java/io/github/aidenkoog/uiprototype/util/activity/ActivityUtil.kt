package io.github.aidenkoog.uiprototype.util.activity

import android.content.Context
import android.content.Intent

object ActivityUtil {
    fun <T> startActivity(context: Context?, className: Class<T>) {
        val contextF = context ?: return
        val intent = Intent().apply {
            setClass(contextF, className)
            flags = Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP
        }
        contextF.startActivity(intent)
    }

    fun finishActivity(callback: () -> Unit) = callback()
}