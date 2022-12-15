package io.github.aidenkoog.android.data.sources

import io.github.aidenkoog.android.BuildConfig.URL_DOMAIN_SSL
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

object HttpConnection {

    private val builder: Retrofit.Builder = Retrofit.Builder()
        .baseUrl(URL_DOMAIN_SSL)
        .client(requestHeader)
        .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
        .addConverterFactory(GsonConverterFactory.create())

    private val retrofit: Retrofit = builder.build()

    private val requestHeader: OkHttpClient
        get() {
            return OkHttpClient.Builder()
                .readTimeout(30, TimeUnit.SECONDS)
                .connectTimeout(30, TimeUnit.SECONDS)
                .build()

        }

    fun <T> createService(
        serviceClass: Class<T>
    ): T {
        return retrofit.create(serviceClass)
    }
}
