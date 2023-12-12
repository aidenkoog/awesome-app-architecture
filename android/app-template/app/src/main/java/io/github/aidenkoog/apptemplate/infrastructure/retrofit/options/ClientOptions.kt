package io.github.aidenkoog.apptemplate.infrastructure.retrofit.options

import io.github.aidenkoog.apptemplate.infrastructure.retrofit.settings.OkHttpSettings
import okhttp3.ConnectionPool
import okhttp3.Dispatcher
import okhttp3.Interceptor
import okhttp3.logging.HttpLoggingInterceptor
import java.util.*
import javax.net.SocketFactory
import javax.net.ssl.X509TrustManager

open class ClientOptions {

    var connectionTimeout: Long = OkHttpSettings.CONNECTION_TIMEOUT

    var readTimeout: Long = OkHttpSettings.READ_TIMEOUT

    var writeTimeout: Long = OkHttpSettings.WRITE_TIMEOUT

    var retryOnConnectionFailure: Boolean = false

    var socketFactory: SocketFactory? = null
        protected set

    var trustManager: X509TrustManager? = null
        protected set

    var dispatcher: Dispatcher? = null
        protected set

    var connectionPool: ConnectionPool? = null
        protected set

    var headers: MutableMap<String, String> = HashMap()

    var interceptors: MutableList<Interceptor> = ArrayList()

    var logger: HttpLoggingInterceptor.Level = HttpLoggingInterceptor.Level.NONE

    fun addInterceptor(interceptor: Interceptor) = apply {
        interceptors.add(interceptor)
    }

    fun putHeader(name: String, value: String) = apply {
        headers[name] = value
    }
}
