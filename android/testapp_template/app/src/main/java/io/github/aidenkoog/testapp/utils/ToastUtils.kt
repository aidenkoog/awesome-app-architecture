package io.github.aidenkoog.testapp.utils

import android.content.Context
import android.widget.Toast

object ToastUtils {
    fun makeToast(context: Context, message: String, toastLength: Int): Toast =
        Toast.makeText(context, message, toastLength)
}