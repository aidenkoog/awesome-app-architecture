package io.github.aidenkoog.android.util

import android.Manifest
import android.app.Activity
import android.content.pm.PackageManager
import android.os.Build
import androidx.activity.result.ActivityResultLauncher
import com.orhanobut.logger.BuildConfig
import com.orhanobut.logger.Logger
import java.util.*

object PermissionUtil {
    private const val REQUEST_ESSENTIAL_PERMISSION = 100

    private val ESSENTIAL_PERMISSION = if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
        if (BuildConfig.BUILD_TYPE != "release") {
            arrayOf(
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.WRITE_EXTERNAL_STORAGE
            )
        } else {
            arrayOf(
                Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION
            )
        }
    } else {
        if (BuildConfig.BUILD_TYPE != "release") {
            arrayOf(
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.BLUETOOTH_SCAN,
                Manifest.permission.BLUETOOTH_CONNECT
            )
        } else {
            arrayOf(
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.BLUETOOTH_SCAN,
                Manifest.permission.BLUETOOTH_CONNECT
            )
        }
    }

    fun checkRequestPermission(
        activity: Activity,
        requestCode: Int,
        permissionResult: ActivityResultLauncher<Array<String>>
    ): Boolean {
        val limit = PreferenceUtil.getPrefInteger(activity, PreferenceUtil.PERMISSION_LIMIT, 0)
        val deniedList = getDeniedList(activity, requestCode)
        return if (deniedList.size > 0) {
            val deniedPermissions = deniedList.toTypedArray()
            Logger.d("limit: $limit")

            if (limit < 2 && requestCode == REQUEST_ESSENTIAL_PERMISSION) {
                permissionResult.launch(deniedPermissions)

            } else if (limit >= 2 && requestCode == REQUEST_ESSENTIAL_PERMISSION) {
                Logger.d("limit 2 exceed!")
                deniedList.clear()
                permissionResult.launch(deniedList.toTypedArray())
            }
            false

        } else {
            true
        }
    }

    fun getDeniedList(activity: Activity, requestCode: Int): ArrayList<String> {
        val deniedList = ArrayList<String>()
        deniedList.clear()
        val permissions: Array<String>? = getRequestPermissionStr(requestCode)
        for (permission in permissions!!) {
            if (activity.checkSelfPermission(permission) != PackageManager.PERMISSION_GRANTED) {
                deniedList.add(permission)
            }
        }
        return deniedList
    }

    private fun getRequestPermissionStr(requestCode: Int): Array<String>? {
        var permissions: Array<String>? = null
        if (requestCode == REQUEST_ESSENTIAL_PERMISSION) {
            permissions = ESSENTIAL_PERMISSION
        }
        return permissions
    }

    fun isGrantedAll(permissions: Array<out String>, grantResults: IntArray): Boolean {
        Logger.d("permissions : $permissions")
        var isGranted = true
        for (i in grantResults.indices) {
            if (grantResults[i] != PackageManager.PERMISSION_GRANTED) {
                isGranted = false
                break
            }
        }
        return isGranted
    }
}