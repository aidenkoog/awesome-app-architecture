package io.github.aidenkoog.testapp.utils

import android.accessibilityservice.AccessibilityServiceInfo
import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.content.Intent
import android.net.Uri
import android.provider.Settings
import android.view.accessibility.AccessibilityManager
import androidx.activity.ComponentActivity

object PermissionUtils {

    fun checkAccessibilityPermission(context: Context): Boolean {
        val accessEnabled: Int
        try {
            accessEnabled = Settings.Secure.getInt(
                context.contentResolver, Settings.Secure.ACCESSIBILITY_ENABLED
            )
            if (accessEnabled != 0) return true
        } catch (e: Settings.SettingNotFoundException) {
            e.printStackTrace()
        }
        val accessibilityManager: AccessibilityManager =
            context.getSystemService(ComponentActivity.ACCESSIBILITY_SERVICE) as AccessibilityManager

        val list: List<AccessibilityServiceInfo> =
            accessibilityManager.getEnabledAccessibilityServiceList(AccessibilityServiceInfo.DEFAULT)

        for (i in list.indices) {
            if (list[i].resolveInfo.serviceInfo.packageName == context.packageName) {
                return true
            }
        }
        return false
    }

    fun moveToAccessibilitySettings(context: Context) =
        context.startActivity(Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS))

    fun checkOverlayPermission(context: Context): Boolean = Settings.canDrawOverlays(context)

    fun moveToOverlaySettings(context: Context) {
        val intent = Intent(
            Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
            Uri.parse("package:${context.packageName}")
        )
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        context.startActivity(intent)
    }

}