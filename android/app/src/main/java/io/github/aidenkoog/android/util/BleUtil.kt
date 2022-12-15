package io.github.aidenkoog.android.util

object BleUtil {
    fun hexStringToByteArray(hex: String): ByteArray {
        val len = hex.length
        val data = ByteArray(len / 2)
        var i = 0
        while (i < len) {
            data[i / 2] = ((Character.digit(hex[i], 16) shl 4)
                    + Character.digit(hex[i + 1], 16)).toByte()
            i += 2
        }
        return data
    }

    fun byteArrayToHex(dataSet: ByteArray): String {
        val builder = java.lang.StringBuilder(dataSet.size * 2)
        for (data in dataSet) builder.append(String.format("%02x", data))
        return builder.toString()
    }
}