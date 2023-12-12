package io.github.aidenkoog.apptemplate.infrastructure.retrofit.rx

import io.reactivex.*
import retrofit2.Call
import retrofit2.CallAdapter
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import java.lang.reflect.Type

class RxJava2WithRetryCallAdapterFactory private constructor(
    count: Int,
    private val interval: Long,
) : CallAdapter.Factory() {
    private val original: RxJava2CallAdapterFactory = RxJava2CallAdapterFactory.create()

    /*
     * Forces the minimum value called COUNT to the value of 1.
     * ex. if count is 5, value is going to be 5.
     * ex. if count is 5 and coerceAtMost api is used, value is going to be 1.
     */
    private val count: Int = 1.coerceAtLeast(count)

    override fun get(
        returnType: Type,
        annotations: Array<Annotation>,
        retrofit: Retrofit,
    ): CallAdapter<out Any, *> = RxCallAdapterWrapper(
        original.get(returnType, annotations, retrofit), count, interval
    )


    private class RxCallAdapterWrapper<R : Any>(
        private val adapter: CallAdapter<R, *>?,
        private val retryCount: Int,
        private val interval: Long,
    ) : CallAdapter<R, Any> {

        override fun responseType(): Type = adapter?.responseType() ?: Any::class.java

        @Throws(IllegalStateException::class)
        override fun adapt(call: Call<R>): Any {

            if (adapter == null) {
                throw IllegalStateException()
            }

            when (val ob = adapter.adapt(call)) {
                is Single<*> -> return ob.retryWhen(
                    RxJava2RetryWithDelayFlowable.create(
                        retryCount, interval
                    )
                )

                is Maybe<*> -> return ob.retryWhen(
                    RxJava2RetryWithDelayFlowable.create(
                        retryCount, interval
                    )
                )

                is Flowable<*> -> return ob.retryWhen(
                    RxJava2RetryWithDelayFlowable.create(
                        retryCount, interval
                    )
                )

                is Completable -> return ob.retryWhen(
                    RxJava2RetryWithDelayFlowable.create(
                        retryCount, interval
                    )
                )

                is Observable<*> -> return ob.retryWhen(
                    RxJava2RetryWithDelayObservable.create(
                        retryCount, interval
                    )
                )

                else -> return ob
            }
        }
    }

    companion object {
        fun create(count: Int, interval: Long): CallAdapter.Factory {
            return RxJava2WithRetryCallAdapterFactory(count, interval)
        }
    }
}