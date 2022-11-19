package io.github.aidenkoog.android.data.repository

import io.reactivex.Single
import io.github.aidenkoog.android.data.source.remote.rest.RetrofitService
import io.github.aidenkoog.android.domain.model.AppInfo
import io.github.aidenkoog.android.domain.repository.InitAppRepository

class InitAppRepositoryImpl(
    private val retrofitService: RetrofitService
) : InitAppRepository {
    override fun loadAppInfo(): Single<List<AppInfo>> {
        return retrofitService.requestAppVersion()
    }
}