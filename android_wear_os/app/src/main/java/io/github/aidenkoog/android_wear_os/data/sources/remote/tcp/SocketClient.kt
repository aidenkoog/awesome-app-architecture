package io.github.aidenkoog.android_wear_os.data.sources.remote.tcp

import java.io.InputStream
import java.io.OutputStream
import java.io.Serializable
import java.net.InetAddress
import java.net.Socket

class SocketClient : Serializable {
    private lateinit var socket: Socket
    private lateinit var inputStream: InputStream
    private lateinit var outputStream: OutputStream

    fun connect(port: Int) {
        try {
            val socketAddress = InetAddress.getLocalHost()
            socket = Socket(socketAddress, port)
            outputStream = socket.getOutputStream()
            inputStream = socket.getInputStream()
        } catch (e: Exception) {
            println("socket connect exception start!!")
            println("e: $e")
        }
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
            println(it)
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