package io.github.aidenkoog.android_wear_os.domain.usecases

import io.github.aidenkoog.android_wear_os.domain.model.DeviceInfo
import io.github.aidenkoog.android_wear_os.domain.repositories.DeviceInfoRepository
import io.github.aidenkoog.android_wear_os.domain.usecases.base.SingleUseCase
import io.reactivex.Observable
import io.reactivex.Single
import javax.inject.Inject

class GetDeviceInfoUseCase @Inject constructor(
    private val repository: DeviceInfoRepository
): SingleUseCase<DeviceInfo>() {

    override fun buildUseCaseSingle(): Single<DeviceInfo> {
        val deviceList = repository.getDevices()
        val source = Observable.just(DeviceInfo(0L, ""))
        return Single.fromObservable(source)
    }
}