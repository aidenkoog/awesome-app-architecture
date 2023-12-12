package io.github.aidenkoog.apptemplate.infrastructure.retrofit.factory

import io.github.aidenkoog.apptemplate.infrastructure.retrofit.options.ClientOptions
import io.github.aidenkoog.apptemplate.infrastructure.retrofit.options.ServiceOptions
import okhttp3.OkHttpClient
import retrofit2.Retrofit

interface RetrofitFactory {

    fun buildRetrofit(baseUrl: String): Retrofit

    fun buildClient(): OkHttpClient

    fun createClientOptions(): ClientOptions

    fun createServiceOptions(): ServiceOptions
}
