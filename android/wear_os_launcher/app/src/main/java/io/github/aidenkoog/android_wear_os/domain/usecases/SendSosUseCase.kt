package io.github.aidenkoog.android_wear_os.domain.usecases

import io.github.aidenkoog.android_wear_os.domain.repositories.DeviceInfoRepository
import javax.inject.Inject

class SendSosUseCase @Inject constructor(
    private val repository: DeviceInfoRepository
) {
    fun execute() {
        return repository.sendSos()
    }
}