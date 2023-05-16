package io.github.aidenkoog.android_wear_os.data.repositories

import com.orhanobut.logger.Logger
import io.github.aidenkoog.android_wear_os.data.sources.local.AppDatabase
import io.github.aidenkoog.android_wear_os.data.sources.remote.tcp.RxSocketClient
import io.github.aidenkoog.android_wear_os.data.sources.remote.tcp.SocketClient
import io.github.aidenkoog.android_wear_os.domain.model.DeviceInfo
import io.github.aidenkoog.android_wear_os.domain.model.SocketResult
import io.github.aidenkoog.android_wear_os.domain.repositories.DeviceInfoRepository
import io.reactivex.Single

class DeviceInfoRepositoryImpl(
    private val database: AppDatabase,
    private val socketClient: RxSocketClient?
) : DeviceInfoRepository{

    override fun getDevices(): ArrayList<String>? {
        return null
    }

    override fun getDevice(id: Long?): Single<DeviceInfo>? {
        database.appDao.deleteAll()
        return null
    }

    override fun sendSos() {
        Logger.d("sendSos")
        socketClient?.createSocket()
    }

    override fun connectSocket() {

    }
}