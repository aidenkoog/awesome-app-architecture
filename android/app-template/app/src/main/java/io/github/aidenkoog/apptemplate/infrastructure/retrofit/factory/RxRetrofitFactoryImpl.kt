package io.github.aidenkoog.apptemplate.infrastructure.retrofit.factory

import io.github.aidenkoog.apptemplate.infrastructure.retrofit.options.ServiceOptions
import io.github.aidenkoog.apptemplate.infrastructure.retrofit.rx.RxJava2WithRetryCallAdapterFactory
import okhttp3.OkHttpClient
import retrofit2.CallAdapter
import retrofit2.Converter
import retrofit2.Retrofit

abstract class RxRetrofitFactoryImpl : RetrofitFactoryImpl() {

    override fun buildRetrofit(baseUrl: String): Retrofit {
        return RxRetrofitBuilder(baseUrl, createServiceOptions(), buildClient()).build()
    }

    /**
     * 옵션에 따른 기능
     * 기본 연결 설정 값 : connection read write timeout, keep alive, retry 횟수
     * 헤더 옵션 : header 에 설정 될 값
     * 데이터 관련 옵션 : 보안(ssl, v2sl), 압축(gzip),
     * 부가 옵션 : log, debug mode, cookie 등
     */

    private class RxRetrofitBuilder(
        val baseUrl: String,
        val options: ServiceOptions,
        val client: OkHttpClient,
    ) {

        private val builder: Retrofit.Builder = Retrofit.Builder()

        private fun buildClient(baseUrl: String, client: OkHttpClient): RxRetrofitBuilder {
            builder.baseUrl(baseUrl).client(client)
            return this
        }

        private fun buildConnection(retryCount: Int, interval: Long): RxRetrofitBuilder {
            builder.addCallAdapterFactory(/* RxJava call adapter factory. */
                RxJava2WithRetryCallAdapterFactory.create(
                    retryCount, interval
                )
            )
            return this
        }

        private fun buildConverter(converters: List<Converter.Factory>?): RxRetrofitBuilder {
            if (!converters.isNullOrEmpty()) {
                for (factory in converters) {
                    builder.addConverterFactory(factory)
                }
            }
            return this
        }

        private fun buildAdapter(adapters: List<CallAdapter.Factory>?): RxRetrofitBuilder {
            if (!adapters.isNullOrEmpty()) {
                for (factory in adapters) {
                    builder.addCallAdapterFactory(factory)
                }
            }
            return this
        }

        fun builder(): Retrofit.Builder = builder

        fun build(): Retrofit {
            return buildClient(baseUrl, client).buildConnection(
                options.retryCount, options.retryInterval
            ).buildConverter(options.converterFactory).buildAdapter(options.adapterFactory)
                .builder().build()
        }
    }
}
