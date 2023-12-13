package io.github.aidenkoog.apptemplate.extensions

import android.content.Context
import android.net.ConnectivityManager
import android.widget.Toast
import androidx.annotation.StringRes

fun Context.connectivityManager() =
    getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager

fun Context.toast(@StringRes resId: Int, duration: Int = Toast.LENGTH_LONG) =
    Toast.makeText(this, resId, duration).show()

fun Context.toast(message: String, duration: Int = Toast.LENGTH_LONG) =
    Toast.makeText(this, message, duration).show()