package io.github.aidenkoog.android_wear_os.utils.utils

import com.google.gson.Gson
import com.google.gson.TypeAdapter
import com.google.gson.annotations.SerializedName
import com.orhanobut.logger.Logger
import io.github.aidenkoog.android_wear_os.domain.model.ResponseDataSource
import retrofit2.HttpException
import java.io.IOException
import java.lang.NumberFormatException

object HttpErrorUtil {

    data class Error(
        @SerializedName("code")
        val code: Int,
        @SerializedName("msg")
        val message: String,
        @SerializedName("data")
        val data: Any
    )

    var prevParsedErrorCode = 0

    fun getHttpErrorResponseDataSource(throwable: Throwable)
            : ResponseDataSource.HttpResponseBase {
        if (!hasValidThrowable(throwable)) {
            return ResponseDataSource.HttpResponseBase(0, "", null)
        }

        val httpException = throwable as HttpException
        val gson = Gson()
        val adapter: TypeAdapter<Error> = gson.getAdapter(Error::class.java)

        var errorCode: Int? = null
        var errorMessage: String? = null
        var errorExtraData: Any? = null

        try {
            val errorBody = httpException.response()?.errorBody()
            Logger.e("HTTP-ERROR, error JSON body : ${errorBody?.toString()}")
            val error: Error = adapter.fromJson(errorBody?.string())

            Logger.e("HTTP-ERROR, start to extract error related data !!!")
            errorCode = error.code
            prevParsedErrorCode = errorCode
            errorMessage = error.message
            errorExtraData = error.data

            Logger.d(
                "HTTP-ERROR, error code: $errorCode, " +
                        "error message: $errorMessage, " +
                        "errorExtraData: $errorExtraData"
            )

        } catch (e: IOException) {
            Logger.e("HTTP-ERROR, error occurs while parsing errorBody !!!")

        } catch (e: NumberFormatException) {
            Logger.e("HTTP-ERROR, error occurs while casting type from String to Int !!!")
        }
        return ResponseDataSource.HttpResponseBase(errorCode, errorMessage, errorExtraData)
    }

    private fun hasValidThrowable(throwable: Throwable): Boolean {
        var hasValidThrowable = true
        if (throwable !is HttpException) {
            hasValidThrowable = false
        }
        return hasValidThrowable
    }
}