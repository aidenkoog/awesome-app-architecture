package io.github.aidenkoog.android_wear_os.domain.model

import com.google.gson.annotations.SerializedName

interface ResponseDataSource {
    data class HttpResponseBase(
        @SerializedName("code")
        var code: Int?,
        @SerializedName("msg")
        var msg: String?,
        @SerializedName("data")
        var data: Any?
    )

    data class SignIn(
        var passwordStatus: Int?,
    )

    data class Error(
        var error: HttpResponseBase
    )
}
