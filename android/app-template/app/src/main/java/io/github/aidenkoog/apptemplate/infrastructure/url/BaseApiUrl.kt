package io.github.aidenkoog.apptemplate.infrastructure.url

import io.github.aidenkoog.apptemplate.infrastructure.retrofit.options.Url

class BaseApiUrl : Url {
    override fun getUrl(): String = "SERVER_BASE_DOMAIN_URL"
}