package io.github.aidenkoog.android.util

import android.content.Context
import android.text.TextUtils
import com.orhanobut.logger.Logger
import java.lang.Exception

object PreferenceUtil {
    const val PERMISSION_LIMIT = "permission_limit"

    fun setPrefObject(c: Context?, strPrefName: String?, obj: Any?) {
        if (null == c || TextUtils.isEmpty(strPrefName) || null == obj) return
        val pref = c.getSharedPreferences(c.packageName, Context.MODE_PRIVATE)
        val edit = pref.edit()
        when (obj) {
            is String -> {
                edit.putString(strPrefName, obj)
            }

            is Boolean -> {
                edit.putBoolean(strPrefName, obj)
            }

            is Int -> {
                edit.putInt(strPrefName, obj)
            }

            is Float -> {
                edit.putFloat(strPrefName, obj)
            }

            is Long -> {
                edit.putLong(strPrefName, obj)
            }
        }
        edit.apply()
    }

    fun getPrefString(c: Context?, strPrefName: String?, defaultValue: String): String? {
        Logger.d("getPrefString - strPrefName : $strPrefName")
        if (null == c || TextUtils.isEmpty(strPrefName)) {
            Logger.e("context is null or preference name is empty !!!")
            return defaultValue
        }
        return try {
            val pref = c.getSharedPreferences(c.packageName, Context.MODE_PRIVATE)
            pref.getString(strPrefName, defaultValue)
        } catch (e: Exception) {
            e.printStackTrace()
            defaultValue
        }
    }

    fun getPrefBoolean(c: Context?, strPrefName: String?, defaultValue: Boolean): Boolean {
        if (null == c || TextUtils.isEmpty(strPrefName)) return defaultValue
        val value: Boolean = try {
            val pref = c.getSharedPreferences(c.packageName, Context.MODE_PRIVATE)
            pref.getBoolean(strPrefName, defaultValue)
        } catch (e: Exception) {
            e.printStackTrace()
            defaultValue
        }
        return value
    }

    fun getPrefInteger(c: Context?, strPrefName: String?, defaultValue: Int): Int {
        if (null == c || TextUtils.isEmpty(strPrefName)) return defaultValue
        val value: Int = try {
            val pref = c.getSharedPreferences(c.packageName, Context.MODE_PRIVATE)
            pref.getInt(strPrefName, defaultValue)
        } catch (e: Exception) {
            e.printStackTrace()
            defaultValue
        }
        return value
    }

    fun getPrefFloat(c: Context?, strPrefName: String?, defaultValue: Float): Float {
        if (null == c || TextUtils.isEmpty(strPrefName)) return defaultValue
        val value: Float = try {
            val pref = c.getSharedPreferences(c.packageName, Context.MODE_PRIVATE)
            pref.getFloat(strPrefName, defaultValue)
        } catch (e: Exception) {
            e.printStackTrace()
            defaultValue
        }
        return value
    }

    fun getPrefLong(c: Context?, strPrefName: String?, defaultValue: Long): Long {
        if (null == c || TextUtils.isEmpty(strPrefName)) return defaultValue
        val value: Long = try {
            val pref = c.getSharedPreferences(c.packageName, Context.MODE_PRIVATE)
            pref.getLong(strPrefName, defaultValue)
        } catch (e: Exception) {
            e.printStackTrace()
            defaultValue
        }
        return value
    }

    fun removePref(c: Context?, title: String?) {
        if (null == c || TextUtils.isEmpty(title)) return
        val pref = c.getSharedPreferences(c.packageName, Context.MODE_PRIVATE)
        val edit = pref.edit()
        edit.remove(title)
        edit.apply()
    }

    fun clearPref(c: Context?) {
        if (null == c) return
        val pref = c.getSharedPreferences(c.packageName, Context.MODE_PRIVATE)
        val edit = pref.edit()
        edit.clear()
        edit.apply()
    }
}
