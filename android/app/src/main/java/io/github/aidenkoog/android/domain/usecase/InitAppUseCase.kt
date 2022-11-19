package io.github.aidenkoog.android.domain.usecase

import io.reactivex.Single
import io.github.aidenkoog.android.domain.model.AppInfo
import io.github.aidenkoog.android.domain.repository.InitAppRepository
import io.github.aidenkoog.android.domain.usecase.base.SingleUseCase
import javax.inject.Inject

class InitAppUseCase @Inject constructor(
    private val repository: InitAppRepository
) : SingleUseCase<List<AppInfo>>() {

    override fun buildUseCaseSingle(): Single<List<AppInfo>> {
        return repository.loadAppInfo()
    }
}