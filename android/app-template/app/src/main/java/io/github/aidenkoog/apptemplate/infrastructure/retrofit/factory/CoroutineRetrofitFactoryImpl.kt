package io.github.aidenkoog.apptemplate.infrastructure.retrofit.factory

import io.github.aidenkoog.apptemplate.infrastructure.retrofit.options.ServiceOptions
import okhttp3.OkHttpClient
import retrofit2.CallAdapter
import retrofit2.Converter
import retrofit2.Retrofit

abstract class CoroutineRetrofitFactoryImpl : RetrofitFactoryImpl() {

    override fun buildRetrofit(baseUrl: String): Retrofit =
        CoroutineRetrofitBuilder(baseUrl, createServiceOptions(), buildClient()).build()

    private class CoroutineRetrofitBuilder(
        val baseUrl: String,
        val options: ServiceOptions,
        val client: OkHttpClient,
    ) {

        private val builder: Retrofit.Builder = Retrofit.Builder()

        private fun buildClient(baseUrl: String, client: OkHttpClient): CoroutineRetrofitBuilder {
            builder.baseUrl(baseUrl).client(client)
            return this
        }

        private fun buildConnection(): CoroutineRetrofitBuilder = this

        private fun buildConverter(converters: List<Converter.Factory>?): CoroutineRetrofitBuilder {
            if (!converters.isNullOrEmpty()) {
                for (factory in converters) {
                    builder.addConverterFactory(factory)
                }
            }
            return this
        }

        private fun buildAdapter(adapters: List<CallAdapter.Factory>?): CoroutineRetrofitBuilder {
            if (!adapters.isNullOrEmpty()) {
                for (factory in adapters) {
                    builder.addCallAdapterFactory(factory)
                }
            }
            return this
        }

        fun builder(): Retrofit.Builder = builder

        fun build(): Retrofit =
            buildClient(baseUrl, client).buildConnection().buildConverter(options.converterFactory)
                .buildAdapter(options.adapterFactory).builder().build()
    }
}