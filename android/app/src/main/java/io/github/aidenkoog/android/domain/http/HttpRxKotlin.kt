package io.github.aidenkoog.android.domain.http

import io.reactivex.Observer
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import io.github.aidenkoog.android.data.sources.HttpConnection
import io.github.aidenkoog.android.domain.model.RequestDataSource
import io.github.aidenkoog.android.domain.model.ResponseDataSource

object HttpRxKotlin {
    fun signIn(
        id: String?,
        pw: String?,
        observer: Observer<ResponseDataSource.HttpResponseBase>?
    ) {
        if (observer != null) {
            HttpConnection.createService(HttpRequestData::class.java)
                .requestSignIn(RequestDataSource.SignIn(id, pw))
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(observer)
        }
    }
}

