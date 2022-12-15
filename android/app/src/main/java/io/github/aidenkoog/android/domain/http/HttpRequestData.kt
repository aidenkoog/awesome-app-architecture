package io.github.aidenkoog.android.domain.http

import io.reactivex.Observable
import io.github.aidenkoog.android.domain.model.RequestDataSource
import io.github.aidenkoog.android.domain.model.ResponseDataSource
import io.github.aidenkoog.android.domain.http.NetworkConstants.URL_SIGN_IN
import retrofit2.http.*

interface HttpRequestData {
    @Headers("Content-Type: application/json; charset=UTF-8")
    @POST(URL_SIGN_IN)
    fun requestSignIn(@Body body: RequestDataSource.SignIn?)
            : Observable<ResponseDataSource.HttpResponseBase>
}
