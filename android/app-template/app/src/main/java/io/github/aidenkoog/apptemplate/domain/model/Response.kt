package io.github.aidenkoog.apptemplate.domain.model

import com.google.gson.annotations.SerializedName

open class Response<T> {

    @SerializedName("status")
    var status: Int = 0

    @SerializedName("code")
    var code: Int = 0

    @SerializedName("message")
    var message: String? = null

    var data: T? = null

    fun isSuccess() = status == 200
}