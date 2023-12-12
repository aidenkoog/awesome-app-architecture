package io.github.aidenkoog.apptemplate.infrastructure.retrofit.repository

import android.util.Pair
import io.github.aidenkoog.apptemplate.infrastructure.retrofit.annotation.BaseUrl
import io.github.aidenkoog.apptemplate.infrastructure.retrofit.annotation.Factory
import io.github.aidenkoog.apptemplate.infrastructure.retrofit.factory.RetrofitFactory
import io.github.aidenkoog.apptemplate.infrastructure.retrofit.factory.RetrofitNoOptionFactory
import retrofit2.Retrofit
import java.lang.ref.WeakReference

@Suppress("UNCHECKED_CAST")
object RetrofitRepository {

    private val serviceMap = HashMap<Long, Pair<Retrofit, HashMap<Class<*>, WeakReference<*>>>>()

    fun <S> create(service: Class<S>): S {
        val pair = getRetrofit(service)
        return getService(pair, service)
    }

    private fun <S> getService(
        pair: Pair<Retrofit, HashMap<Class<*>, WeakReference<*>>>,
        service: Class<S>,
    ): S {
        val reference = pair.second[service]
        var apiService = reference?.get()
        if (apiService == null) {
            apiService = pair.first.create(service)
            pair.second[service] = WeakReference(apiService)
        }
        return apiService as S
    }

    private fun <S> getRetrofit(service: Class<S>): Pair<Retrofit, HashMap<Class<*>, WeakReference<*>>> {
        val hashCode = hashCode(service)
        var pair: Pair<Retrofit, HashMap<Class<*>, WeakReference<*>>>? = serviceMap[hashCode]
        if (pair == null) {
            pair = createRetrofit(service, getBaseUrl(service), getFactoryClass(service))
            serviceMap[hashCode] = pair
        }
        return pair
    }

    private fun <S> createRetrofit(
        service: Class<S>, baseUrl: String, factoryClass: Class<out RetrofitFactory>,
    ): Pair<Retrofit, HashMap<Class<*>, WeakReference<*>>> {
        val retrofit = factoryClass.newInstance().buildRetrofit(baseUrl)
        val services = HashMap<Class<*>, WeakReference<*>>()
        services[service] = WeakReference(retrofit.create(service))
        return Pair(retrofit, services)
    }

    private fun <T> getFactoryClass(t: Class<T>): Class<out RetrofitFactory> {
        var targetClass: Class<*>? = t
        while (targetClass != null) {
            val annotation = targetClass.getAnnotation(Factory::class.java)
            if (annotation != null) return annotation.factory.java
            targetClass = targetClass.superclass
        }
        return RetrofitNoOptionFactory::class.java
    }

    private fun <T> getBaseUrl(t: Class<T>): String {
        var targetClass: Class<*>? = t
        while (targetClass != null) {
            val annotation = targetClass.getAnnotation(BaseUrl::class.java)
            annotation?.let {
                return it.baseUrl.java.newInstance().getUrl()
            }
            targetClass = targetClass.superclass
        }
        return ""
    }

    private fun <S> hashCode(service: Class<S>): Long = service.hashCode().toLong()
}
