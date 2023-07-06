package io.github.aidenkoog.viewinfotest

import android.accessibilityservice.AccessibilityServiceInfo
import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.DialogInterface
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.provider.Settings.SettingNotFoundException
import android.view.accessibility.AccessibilityManager
import androidx.activity.ComponentActivity
import androidx.annotation.RequiresApi
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat


class MainActivity : ComponentActivity() {
    @SuppressLint("PrivateApi", "ObsoleteSdkInt")
    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.overlay_layout2)

        if (ContextCompat.checkSelfPermission(
                this, android.Manifest.permission.READ_PHONE_STATE
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            ActivityCompat.requestPermissions(
                this, arrayOf(
                    android.Manifest.permission.READ_PHONE_STATE
                ), 100
            )
        }

        if (!checkAccessibilityPermissions()) {
            setAccessibilityPermissions()
        }

        if (Build.VERSION.SDK_INT >= 23 && !Settings.canDrawOverlays(this)) {   //Android M Or Over
            val intent =
                Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:$packageName"))
            startActivity(intent)
        }
    }

    private fun checkOverlayPermission() {
        if (Build.VERSION.SDK_INT >= 23 && !Settings.canDrawOverlays(this)) {   //Android M Or Over
            val intent =
                Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:$packageName"))
            startActivity(intent)
        }
    }

    private fun checkAccessibilityPermission(): Boolean {
        var accessEnabled = 0
        try {
            accessEnabled =
                Settings.Secure.getInt(this.contentResolver, Settings.Secure.ACCESSIBILITY_ENABLED)
        } catch (e: SettingNotFoundException) {
            e.printStackTrace()
        }
        return if (accessEnabled == 0) {
            // if not construct intent to request permission
            val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
            intent.flags = Intent.FLAG_ACTIVITY_NO_ANIMATION

            val uri = Uri.fromParts("package", packageName, null)
            intent.data = uri
            // request permission via start activity for result
            startActivity(intent)
            false
        } else {
            true
        }
    }

    private fun checkAccessibilityPermissions(): Boolean {
        val accessibilityManager: AccessibilityManager =
            getSystemService(ACCESSIBILITY_SERVICE) as AccessibilityManager
        val list: List<AccessibilityServiceInfo> =
            accessibilityManager.getEnabledAccessibilityServiceList(AccessibilityServiceInfo.DEFAULT)
        for (i in list.indices) {
            val info = list[i]
            if (info.resolveInfo.serviceInfo.packageName == application.packageName) {
                return true
            }
        }
        return false
    }

    private fun setAccessibilityPermissions() {
        val gsDialog = AlertDialog.Builder(this)
        gsDialog.setTitle("접근성 권한 설정")
        gsDialog.setMessage("접근성 권한을 필요로 합니다")
        gsDialog.setPositiveButton("확인", DialogInterface.OnClickListener { _, _ -> // 설정화면으로 보내는 부분
            startActivity(Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS))
            return@OnClickListener
        }).create().show()
    }
}