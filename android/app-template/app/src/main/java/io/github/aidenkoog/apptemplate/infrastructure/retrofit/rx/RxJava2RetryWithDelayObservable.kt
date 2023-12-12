package io.github.aidenkoog.apptemplate.infrastructure.retrofit.rx

import io.github.aidenkoog.apptemplate.infrastructure.retrofit.exception.RetrofitException
import io.reactivex.Observable
import io.reactivex.ObservableSource
import io.reactivex.functions.Function
import retrofit2.HttpException
import java.io.IOException
import java.util.concurrent.TimeUnit

class RxJava2RetryWithDelayObservable(private val retryCount: Int, private val interval: Long) :
    Function<Observable<Throwable>, ObservableSource<*>> {

    @Throws(Exception::class)
    override fun apply(failures: Observable<Throwable>): ObservableSource<*> {

        /*
         * zip()
         * - use each observable and merge multiple observable.
         * zipWith()
         * - this is the same with zip()
         * - Strength: compose various functions with observable and it can be called.
         */
        return failures.zipWith<Int, Int>(Observable.range(1, retryCount + 1)) { error, count ->
            if (error !is HttpException && error !is IOException) {
                throw error
            }
            if (count <= retryCount) count else throw RetrofitException(error)

        }.flatMap { Observable.timer(interval, TimeUnit.MILLISECONDS) }
    }

    companion object {
        fun create(retryCount: Int, interval: Long): RxJava2RetryWithDelayObservable =
            RxJava2RetryWithDelayObservable(retryCount, interval)
    }
}