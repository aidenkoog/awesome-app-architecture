package io.github.aidenkoog.websockettest.websocket.cache

import android.app.Activity
import android.content.Context
import android.content.SharedPreferences

object PreferencesUtil {

    private const val PREFERENCES_NAME_SETTING = "Setting"

    private fun with(context: Context, name: String): SharedPreferences? =
        context.getSharedPreferences(name, Activity.MODE_PRIVATE)

    private fun setValue(preferences: SharedPreferences, key: String, value: Any) {
        val editor = preferences.edit()
        when (value) {
            is Boolean -> editor.putBoolean(key, value)
            is String -> editor.putString(key, value)
            is Long -> editor.putLong(key, value)
        }
        editor.apply()
    }

    fun setSetting(context: Context, key: String, value: String) {
        with(context, PREFERENCES_NAME_SETTING)?.let {
            val sharedPreferencesEditor = it.edit()
            sharedPreferencesEditor.putString(key, value)
            sharedPreferencesEditor.apply()
        }
    }

    fun getSetting(context: Context, key: String, default: String): String? =
        with(context, PREFERENCES_NAME_SETTING)?.getString(key, default)
}