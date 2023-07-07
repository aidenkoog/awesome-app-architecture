package io.github.aidenkoog.testapp.utils

import android.accessibilityservice.AccessibilityServiceInfo
import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.provider.Settings
import android.view.accessibility.AccessibilityManager
import androidx.activity.ComponentActivity

object PermissionUtils {

    fun checkAccessibilityPermission(activity: Activity): Boolean {
        val accessEnabled: Int
        try {
            accessEnabled = Settings.Secure.getInt(
                activity.contentResolver, Settings.Secure.ACCESSIBILITY_ENABLED
            )
            if (accessEnabled != 0) return true
        } catch (e: Settings.SettingNotFoundException) {
            e.printStackTrace()
        }
        val accessibilityManager: AccessibilityManager =
            activity.getSystemService(ComponentActivity.ACCESSIBILITY_SERVICE) as AccessibilityManager

        val list: List<AccessibilityServiceInfo> =
            accessibilityManager.getEnabledAccessibilityServiceList(AccessibilityServiceInfo.DEFAULT)

        for (i in list.indices) {
            if (list[i].resolveInfo.serviceInfo.packageName == activity.application.packageName) {
                return true
            }
        }
        return false
    }

    fun moveToAccessibilitySettings(activity: Activity) =
        activity.startActivity(Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS))

    fun checkOverlayPermission(activity: Activity): Boolean = Settings.canDrawOverlays(activity)

    fun moveToOverlaySettings(activity: Activity) {
        val intent = Intent(
            Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
            Uri.parse("package:${activity.application.packageName}")
        )
        activity.startActivity(intent)
    }

}