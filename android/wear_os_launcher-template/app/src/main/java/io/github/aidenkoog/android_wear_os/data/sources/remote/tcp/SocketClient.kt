package io.github.aidenkoog.android_wear_os.data.sources.remote.tcp

import com.orhanobut.logger.Logger
import java.io.InputStream
import java.io.OutputStream
import java.io.Serializable
import java.net.Socket

class SocketClient : Serializable {
    private lateinit var socket: Socket
    private lateinit var inputStream: InputStream
    private lateinit var outputStream: OutputStream

    fun connect(ip: String = "112.170.6.125", port: Int = 3000) {
        Logger.d("connect: ip: $ip, port: $port")
        Thread {
            try {
                // val socketAddress = InetAddress.getLocalHost()
                socket = Socket(ip, port)
                Logger.d("socket created")
                outputStream = socket.getOutputStream()
                inputStream = socket.getInputStream()
                Logger.d("socket completed")
            } catch (e: Exception) {
                Logger.d("socket connect exception start!!")
                Logger.d("e: $e")
            }
        }.start()
    }

    fun sendData(data: String) {
        outputStream.write(
            (data + "\n").toByteArray(Charsets.UTF_8)
        )
    }

    fun flush() {
        outputStream.flush()
    }

    fun read(): Boolean {
        var isRead = false
        if (inputStream.available() > 0) {
            isRead = true
        }
        inputStream.bufferedReader(Charsets.UTF_8).forEachLine {
            Logger.d(it)
        }
        return isRead
    }

    fun getDummy(): ArrayList<String> {
        val dummyList = ArrayList<String>()
        dummyList.add("dummy")
        return dummyList
    }

    fun closeConnect() {
        outputStream.close()
        inputStream.close()
        socket.close()
    }
}