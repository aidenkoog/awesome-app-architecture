package io.github.aidenkoog.apptemplate.infrastructure.retrofit.settings

object OkHttpSettings {
    const val CONNECTION_TIMEOUT = 20L
    const val READ_TIMEOUT = 65L
    const val WRITE_TIMEOUT = 65L

    const val CONNECTION_TIMEOUT_IN_MILLIS = CONNECTION_TIMEOUT * 1000L
    const val READ_TIMEOUT_IN_MILLIS = CONNECTION_TIMEOUT * 1000L

}