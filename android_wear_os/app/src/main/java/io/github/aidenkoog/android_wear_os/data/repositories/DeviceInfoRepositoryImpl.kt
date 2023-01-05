package io.github.aidenkoog.android_wear_os.data.repositories

import io.github.aidenkoog.android_wear_os.data.sources.local.AppDatabase
import io.github.aidenkoog.android_wear_os.data.sources.remote.tcp.SocketClient
import io.github.aidenkoog.android_wear_os.domain.model.DeviceInfo
import io.github.aidenkoog.android_wear_os.domain.repositories.DeviceInfoRepository
import io.reactivex.Single

class DeviceInfoRepositoryImpl(
    private val database: AppDatabase,
    private val socketClient: SocketClient?
) : DeviceInfoRepository{

    override fun getDevices(): ArrayList<String>? {
        return socketClient?.getDummy()
    }

    override fun getDevice(id: Long?): Single<DeviceInfo>? {
        database.appDao.deleteAll()
        return null
    }
}