package io.github.aidenkoog.testapp.utils

import android.app.Activity
import android.app.AlertDialog

object DialogUtils {

    fun makeAlert(activity: Activity): AlertDialog.Builder = AlertDialog.Builder(activity)
}