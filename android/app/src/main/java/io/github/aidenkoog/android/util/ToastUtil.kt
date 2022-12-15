package io.github.aidenkoog.android.util

import android.content.Context
import android.widget.Toast

object ToastUtil {
    fun showToast(context: Context?, message: String?) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
    }
}