package io.github.aidenkoog.apptemplate.infrastructure.retrofit.options

import retrofit2.CallAdapter
import retrofit2.Converter
import java.util.*

class ServiceOptions {

    var retryCount = 0

    var retryInterval: Long = 0

    var converterFactory: MutableList<Converter.Factory> = ArrayList()

    var adapterFactory: MutableList<CallAdapter.Factory> = ArrayList()

    fun addConvertFactory(converterFactory: Converter.Factory): ServiceOptions {
        this.converterFactory.add(converterFactory)
        return this
    }
}
