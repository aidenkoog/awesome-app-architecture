package io.github.aidenkoog.apptemplate.infrastructure.retrofit.factory

import io.github.aidenkoog.apptemplate.infrastructure.retrofit.interceptor.HeaderInterceptor
import io.github.aidenkoog.apptemplate.infrastructure.retrofit.options.ClientOptions
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import java.util.concurrent.TimeUnit
import javax.net.SocketFactory
import javax.net.ssl.SSLSocketFactory
import javax.net.ssl.X509TrustManager

abstract class RetrofitFactoryImpl : RetrofitFactory {

    override fun buildClient(): OkHttpClient = ClientBuilder(createClientOptions()).build()

    private class ClientBuilder(private val options: ClientOptions) {

        private val builder: OkHttpClient.Builder = OkHttpClient.Builder()

        private fun buildSecurity(
            socketFactory: SocketFactory?,
            trustManager: X509TrustManager?,
        ): OkHttpClient.Builder {
            if (socketFactory != null && trustManager != null) {
                builder.sslSocketFactory((socketFactory as SSLSocketFactory?)!!, trustManager)
            } else if (socketFactory != null) {
                builder.socketFactory(socketFactory)
            }
            return builder
        }

        private fun buildConnection(options: ClientOptions): OkHttpClient.Builder {
            if (isValid(options.connectionTimeout)) {
                builder.connectTimeout(options.connectionTimeout, TimeUnit.SECONDS)
            }

            if (isValid(options.readTimeout)) {
                builder.readTimeout(options.readTimeout, TimeUnit.SECONDS)
            }

            if (isValid(options.writeTimeout)) {
                builder.writeTimeout(options.writeTimeout, TimeUnit.SECONDS)
            }

            options.dispatcher?.let { builder.dispatcher(it) }
            options.connectionPool?.let { builder.connectionPool(it) }
            builder.retryOnConnectionFailure(options.retryOnConnectionFailure)
            return builder
        }

        private fun buildHeaders(headers: MutableMap<String, String>?): OkHttpClient.Builder {
            if (!headers.isNullOrEmpty()) {
                builder.addInterceptor(HeaderInterceptor(headers))
            }
            return builder
        }

        private fun buildInterceptors(
            interceptors: List<Interceptor>?,
            level: HttpLoggingInterceptor.Level,
        ): OkHttpClient.Builder {
            if (!interceptors.isNullOrEmpty()) {
                for (interceptor in interceptors) {
                    builder.addInterceptor(interceptor)
                }
            }

            if (level != HttpLoggingInterceptor.Level.NONE) {
                val interceptor = HttpLoggingInterceptor()
                interceptor.level = level
                builder.addInterceptor(interceptor)
            }
            return builder
        }

        fun isValid(value: Long): Boolean {
            if (value > 0) return true
            return false
        }

        fun build(): OkHttpClient {
            buildConnection(options)
            buildHeaders(options.headers)
            buildSecurity(options.socketFactory, options.trustManager)
            buildInterceptors(options.interceptors, options.logger)
            return builder.build()
        }
    }
}