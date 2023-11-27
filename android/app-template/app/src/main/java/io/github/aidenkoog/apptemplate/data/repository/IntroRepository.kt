package io.github.aidenkoog.apptemplate.data.repository

import io.github.aidenkoog.apptemplate.domain.model.AppInfo
import io.github.aidenkoog.apptemplate.domain.model.Response
import javax.inject.Inject

class IntroRepository constructor(
    /**
     * retrofit api interface.
     */
    private val retrofitApi: Any,
) {
    suspend fun getAppInfo(osType: String, model: String): Response<AppInfo> {
        return Response()
    }
}