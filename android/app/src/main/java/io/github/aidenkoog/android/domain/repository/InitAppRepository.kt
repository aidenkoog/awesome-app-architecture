package io.github.aidenkoog.android.domain.repository

import io.reactivex.Single
import io.github.aidenkoog.android.domain.model.AppInfo

interface InitAppRepository {
    fun loadAppInfo(): Single<List<AppInfo>>
}