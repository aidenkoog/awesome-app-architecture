package io.github.aidenkoog.android_wear_os.presentation.intro.viewmodel

import android.app.Activity
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import androidx.lifecycle.MutableLiveData
import com.orhanobut.logger.Logger
import dagger.hilt.android.lifecycle.HiltViewModel
import io.github.aidenkoog.android_wear_os.presentation.base.viewmodel.BaseViewModel
import javax.inject.Inject

@HiltViewModel
class SplashViewModel @Inject constructor() : BaseViewModel() {

    val isLoaded = MutableLiveData<Boolean>()

    override fun getViewModelTag(): String {
        return SplashViewModel::class.java.simpleName
    }

    init {
        isLoaded.value = false
    }

    fun compareVersion(serverText: String?, appText: String?): Boolean {
        val serverVersion = serverText?.split(".")
        val appVersion = appText?.split(".")

        var isUpdate = false
        for (i in (2 downTo 0)) {
            val server = serverVersion?.get(i)?.toInt()
            val app = appVersion?.get(i)?.toInt()

            isUpdate = checkVersion(server, app)
        }
        Logger.d("isUpdate : $isUpdate")
        return isUpdate
    }

    private fun checkVersion(server: Int?, app: Int?): Boolean {
        var isUpdate = false
        if (server != null && app != null) {
            if (server > app) {
                isUpdate = true
            } else if (server <= app) {
                isUpdate = false
            }
        }
        return isUpdate
    }

    fun getAppVersionName(activity: Activity): String? {
        val manager = activity.packageManager
        val info: PackageInfo =
            manager.getPackageInfo(activity.packageName, PackageManager.GET_ACTIVITIES)
                ?: return null
        Logger.d(
            "PackageName = " + info.packageName + "\nVersionName = " + info.versionName + "\nPermissions = " + info.permissions
        )
        return info.versionName
    }
}