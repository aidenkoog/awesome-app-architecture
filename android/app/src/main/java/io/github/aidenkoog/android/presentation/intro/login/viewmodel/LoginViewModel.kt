package io.github.aidenkoog.android.presentation.intro.login.viewmodel

import androidx.lifecycle.MutableLiveData
import com.orhanobut.logger.Logger
import io.reactivex.Observer
import io.reactivex.disposables.Disposable
import io.github.aidenkoog.android.domain.model.ResponseDataSource
import io.github.aidenkoog.android.domain.http.NetworkConstants.CODE_200
import io.github.aidenkoog.android.presentation.base.viewmodel.BaseViewModel
import io.github.aidenkoog.android.util.HttpErrorUtil.getHttpErrorResponseDataSource

class LoginViewModel : BaseViewModel() {

    val isLoggedIn = MutableLiveData<Boolean>()
    val isLoggedData = MutableLiveData<String>()
    val isError = MutableLiveData<ResponseDataSource.HttpResponseBase>()
    val isFindId = MutableLiveData<Boolean>()
    val isFindPw = MutableLiveData<Boolean>()
    val isSignUp = MutableLiveData<Boolean>()
    val isBackIconClick = MutableLiveData<Boolean>()

    val signInObserver =
        object : Observer<ResponseDataSource.HttpResponseBase> {
            override fun onComplete() {
                Logger.d("onComplete")
            }

            override fun onSubscribe(d: Disposable) {
                Logger.d("onSubscribe")
            }

            override fun onError(e: Throwable) {
                Logger.e("onError $e")
                isError.value = getHttpErrorResponseDataSource(e)
            }

            override fun onNext(t: ResponseDataSource.HttpResponseBase) {
                Logger.d("onNext $t")
                when (t.code) {
                    CODE_200 -> {
                    }
                    else -> {
                        isError.value = t
                    }
                }
            }
        }

    init {
        isLoggedIn.value = false
    }

    override fun getViewModelTag(): String {
        return LoginViewModel::class.java.simpleName
    }

    fun onLoginButtonClick() {
        isLoggedIn.value = true
    }

    fun onSignUp() {
        isSignUp.value = true
    }

    fun onFindIdClick() {
        isFindId.value = true
    }

    fun onFindPwClick() {
        isFindPw.value = true
    }

    fun onBackButtonClick() {
        isBackIconClick.value = true
    }
}
