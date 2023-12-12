package io.github.aidenkoog.apptemplate.infrastructure.retrofit.rx

import io.github.aidenkoog.apptemplate.infrastructure.retrofit.exception.RetrofitException
import io.reactivex.Flowable
import io.reactivex.functions.Function
import org.reactivestreams.Publisher
import retrofit2.HttpException
import java.io.IOException
import java.util.concurrent.TimeUnit

class RxJava2RetryWithDelayFlowable(private val retryCount: Int, private val interval: Long) :
    Function<Flowable<Throwable>, Publisher<*>> {

    /*
     * flatMap is similar to normal map.
     * in case of flatMap, it doesn't return data itself.
     * return data as Observable, merge them again and return it once again.
     */
    @Throws(Exception::class)
    override fun apply(failures: Flowable<Throwable>): Publisher<*> {
        return failures.zipWith<Int, Int>(
            Flowable.range(1, retryCount + 1)
        ) { error, count ->
            if (error !is HttpException && error !is IOException) {
                throw error
            }
            if (count <= retryCount) count else throw RetrofitException(error)
        }.flatMap { Flowable.timer(interval, TimeUnit.MILLISECONDS) }
    }

    companion object {
        fun create(retryCount: Int, interval: Long): RxJava2RetryWithDelayFlowable =
            RxJava2RetryWithDelayFlowable(retryCount, interval)
    }
}