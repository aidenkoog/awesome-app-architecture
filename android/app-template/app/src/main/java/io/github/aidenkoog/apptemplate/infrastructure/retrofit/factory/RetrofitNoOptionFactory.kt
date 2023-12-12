package io.github.aidenkoog.apptemplate.infrastructure.retrofit.factory

import io.github.aidenkoog.apptemplate.infrastructure.retrofit.options.ClientOptions
import io.github.aidenkoog.apptemplate.infrastructure.retrofit.options.ServiceOptions

class RetrofitNoOptionFactory : RxRetrofitFactoryImpl() {
    override fun createClientOptions(): ClientOptions = ClientOptions()
    override fun createServiceOptions(): ServiceOptions = ServiceOptions()
}