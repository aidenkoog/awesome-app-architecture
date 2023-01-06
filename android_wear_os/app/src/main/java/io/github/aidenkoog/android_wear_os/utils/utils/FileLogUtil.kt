package io.github.aidenkoog.android_wear_os.utils.utils

import android.annotation.SuppressLint
import android.content.Context
import android.icu.text.SimpleDateFormat
import android.os.Environment
import androidx.core.content.ContextCompat
import com.orhanobut.logger.Logger
import io.github.aidenkoog.android_wear_os.BuildConfig
import java.io.File
import java.io.IOException
import java.util.*

object FileLogUtil {

    @SuppressLint("SimpleDateFormat")
    private fun writeFileLog(path: String) {
        val now: Long = System.currentTimeMillis()
        val mDate = Date(now)
        val simpleDate = SimpleDateFormat("hhmmss")
        val getTime: String = simpleDate.format(mDate)
        try {
            val dir = File(path)
            val files = dir.listFiles()
            if (files != null) {
                if (files.size >= 10) {
                    for (i in files) {
                        i.delete()
                    }
                }
            }
            Runtime.getRuntime().exec("logcat -c")
            Runtime.getRuntime()
                .exec("logcat -f $path/${getTime}_app_${BuildConfig.FLAVOR}_log.txt")
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    @SuppressLint("SimpleDateFormat")
    fun saveFileLog(context: Context) {
        val allExternalAppSpecificFiles: Array<File> =
            ContextCompat.getExternalFilesDirs(context, null)
        Logger.d("allExternalAppSepcificFiles : $allExternalAppSpecificFiles")

        if (allExternalAppSpecificFiles.isNotEmpty()) {
            when (allExternalAppSpecificFiles.size) {
                1 -> {
                    Logger.d("can write,read file: ${Environment.getExternalStorageState()}")
                    Logger.d("physically removable: ${Environment.isExternalStorageRemovable()}")
                    Logger.d("media is emulated: ${Environment.isExternalStorageEmulated()}")

                    if (allExternalAppSpecificFiles[0] == null) {
                        Logger.d("path null")

                    } else {
                        Logger.d("path: ${allExternalAppSpecificFiles[0].path}")
                        if (Environment.getExternalStorageState() == Environment.MEDIA_MOUNTED) {
                            writeFileLog(allExternalAppSpecificFiles[0].path)
                        }
                    }
                }
                else -> {
                    Logger.d("physically removable: ${Environment.isExternalStorageRemovable()}")
                    Logger.d("media is emulated: ${Environment.isExternalStorageEmulated()}")
                    Logger.d("can write,read file: ${Environment.getExternalStorageState()}")

                    if (allExternalAppSpecificFiles[0] == null) {
                        Logger.d("path null")

                        if (allExternalAppSpecificFiles[1] == null) {
                            Logger.d("path null")

                        } else {
                            Logger.d("path: ${allExternalAppSpecificFiles[1].path}")
                            Logger.d(
                                "physically removable: ${
                                    Environment.isExternalStorageRemovable(
                                        allExternalAppSpecificFiles[1]
                                    )
                                }"
                            )
                            Logger.d(
                                "media is emulated: ${
                                    Environment.isExternalStorageEmulated(
                                        allExternalAppSpecificFiles[1]
                                    )
                                }"
                            )
                            Logger.d(
                                "can write,read file: ${
                                    Environment.getExternalStorageState(
                                        allExternalAppSpecificFiles[1]
                                    )
                                }"
                            )
                            if (Environment.getExternalStorageState(allExternalAppSpecificFiles[1])
                                == Environment.MEDIA_MOUNTED
                            ) {
                                writeFileLog(
                                    allExternalAppSpecificFiles[1].path
                                )
                            }
                        }
                    } else {
                        Logger.d("path: ${allExternalAppSpecificFiles[0].path}")
                        if (Environment.getExternalStorageState() == Environment.MEDIA_MOUNTED) {
                            writeFileLog(
                                allExternalAppSpecificFiles[0].path
                            )
                        }
                    }
                }
            }
        }
    }
}