package io.github.aidenkoog.apptemplate.exception

import java.io.IOException
import java.net.UnknownHostException

/**
 * customize exceptions.
 */
class ExpiredRefreshTokenException(message: String? = null) :
    IOException("expired token error $message")

class NetworkException(message: String? = null) : UnknownHostException("network error $message")