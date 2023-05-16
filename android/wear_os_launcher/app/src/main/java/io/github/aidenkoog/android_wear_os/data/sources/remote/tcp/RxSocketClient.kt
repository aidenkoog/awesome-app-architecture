package io.github.aidenkoog.android_wear_os.data.sources.remote.tcp

import android.annotation.SuppressLint
import com.orhanobut.logger.Logger
import io.reactivex.Observable
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers
import io.reactivex.subjects.BehaviorSubject
import io.reactivex.subjects.PublishSubject
import java.io.IOException
import java.net.Socket
import java.util.concurrent.TimeUnit

class RxSocketClient {
    var socket: Socket? = null

    val dataSubject: PublishSubject<String>
    val stateSubject: BehaviorSubject<Boolean>

    private val disposables by lazy { CompositeDisposable() }

    init {
        dataSubject = PublishSubject.create()
        stateSubject = BehaviorSubject.createDefault(false)
    }

    fun createSocket(ip: String = "112.170.6.125", port: Int = 8787) {
        Logger.d("createSocket: ip: $ip")
        Thread {
            try {
                socket = Socket(ip, port)
                Logger.d("created socket")
                readPacket(); true
            } catch (e: IOException) {
                false
            }.let { stateSubject.onNext(it) }
        }.start()
    }

    private fun readPacket() {
        Logger.i("readPacket:")
        Observable.interval(100, TimeUnit.MILLISECONDS)
            .repeat()
            .subscribeOn(Schedulers.io())
            .map { socket!! }
            .filter { it.isConnected }
            .map { it.getInputStream() }
            .filter { it.available() > 0 }
            .map {
                val byteArray = ByteArray(it.available())
                it.read(byteArray)
                String(byteArray)
            }.subscribe{ dataSubject.onNext(it) }
            .let { disposables.add(it) }
    }

    @SuppressLint("CheckResult")
    fun sendPacket(msg: String) {
        Observable.just(msg)
            .subscribeOn(Schedulers.io())
            .filter { socket != null }
            .subscribe { socket!!.getOutputStream().write(msg.toByteArray()) }
    }

    fun close() {
        socket?.let {
            it.close()
            disposables.clear()
            stateSubject.onNext(false)
            socket = null
        }
    }
}