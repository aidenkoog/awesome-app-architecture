package io.github.aidenkoog.android.presentation.intro.intro.viewmodel

import android.app.Activity
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import androidx.lifecycle.MutableLiveData
import com.google.gson.Gson
import com.orhanobut.logger.Logger
import io.reactivex.Observer
import io.reactivex.disposables.Disposable
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers.IO
import kotlinx.coroutines.Dispatchers.Main
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import io.github.aidenkoog.android.domain.http.NetworkConstants
import io.github.aidenkoog.android.domain.model.ResponseDataSource
import io.github.aidenkoog.android.presentation.base.viewmodel.BaseViewModel
import io.github.aidenkoog.android.util.HttpErrorUtil

@Suppress("DEPRECATION")
class SplashViewModel : BaseViewModel() {

    val appVersionInfo = MutableLiveData<Int>()
    val isLoaded = MutableLiveData<Boolean>()

    val isLoggedData = MutableLiveData<String>()
    val isError = MutableLiveData<ResponseDataSource.Error>()

    val getCheckAppVersionObserver = object : Observer<ResponseDataSource.HttpResponseBase> {
        override fun onComplete() {
            Logger.d("onComplete")
        }

        override fun onSubscribe(d: Disposable) {
            Logger.d("onSubscribe")
        }

        override fun onError(e: Throwable) {
            Logger.e("onError $e")
            isError.value = ResponseDataSource.Error(
                HttpErrorUtil.getHttpErrorResponseDataSource(e)
            )
        }

        override fun onNext(t: ResponseDataSource.HttpResponseBase) {}
    }

    val autoSignInObserver = object : Observer<ResponseDataSource.HttpResponseBase> {
        override fun onComplete() {
            Logger.d("onComplete")
        }

        override fun onSubscribe(d: Disposable) {
            Logger.d("onSubscribe")
        }

        override fun onError(e: Throwable) {
            Logger.e("onError $e")
            isError.value = ResponseDataSource.Error(
                HttpErrorUtil.getHttpErrorResponseDataSource(e)
            )
        }

        override fun onNext(t: ResponseDataSource.HttpResponseBase) {
            Logger.d("onNext ${t.code}")
            when (t.code) {
                NetworkConstants.CODE_200 -> {
                    val gson = Gson()
                    val jsonString = gson.toJson(t.data)
                    Logger.d("jsonString : $jsonString")
                    isLoggedData.value = jsonString
                }
            }
        }
    }

    init {
        isLoaded.value = false
    }

    override fun getViewModelTag(): String {
        return SplashViewModel::class.java.simpleName
    }

    fun loadAppInfoForTest() {
        CoroutineScope(IO).launch {
            withContext(IO) {
                Thread.sleep(2000)
            }
            CoroutineScope(Main).launch {
                isLoaded.value = true
            }
        }
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
            "PackageName = " + info.packageName + "\nVersionName = "
                    + info.versionName + "\nPermissions = " + info.permissions
        )
        return info.versionName
    }
}