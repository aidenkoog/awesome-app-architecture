package io.github.aidenkoog.apptemplate.utils

import android.content.Context
import android.net.ConnectivityManager

object NetworkUtil {
    @Suppress("DEPRECATION")
    @JvmStatic
    fun isNetworkConnected(context: Context?): Boolean {
        if (context == null) return false
        return try {
            val connectivityManager =
                context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
            val activeNetwork = connectivityManager.activeNetworkInfo
            activeNetwork != null && activeNetwork.isConnectedOrConnecting
        } catch (e: Exception) {
            false
        }
    }
}