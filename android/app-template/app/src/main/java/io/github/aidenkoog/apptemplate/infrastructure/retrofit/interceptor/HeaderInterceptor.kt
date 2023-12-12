package io.github.aidenkoog.apptemplate.infrastructure.retrofit.interceptor

import okhttp3.Interceptor
import okhttp3.Response
import java.io.IOException
import java.util.*
import kotlin.jvm.Throws

class HeaderInterceptor(private val headers: MutableMap<String, String>?) : Interceptor {
    @Throws(IOException::class)
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
        val builder = request.newBuilder()

        if (!headers.isNullOrEmpty()) {
            for ((key, value) in headers) {
                builder.header(key, value)
            }
        }
        return chain.proceed(builder.build())
    }

    class Builder {
        private var headers: MutableMap<String, String> = HashMap()

        fun build(): HeaderInterceptor = HeaderInterceptor(headers)
    }
}
