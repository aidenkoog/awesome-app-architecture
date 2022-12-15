@file:Suppress("KotlinConstantConditions", "SameParameterValue")

package io.github.aidenkoog.android.util

import android.annotation.SuppressLint
import android.text.format.DateFormat
import java.lang.IllegalArgumentException
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*

object TimeFormatUtil {

    private fun get12hTimeFormat(hour: Int, minute: Int): String {
        return when {
            hour > 12 -> {
                "PM " + (if (hour > 12)
                    if ((hour - 12) < 10) "0" + (hour - 12) else hour - 12
                else "0$hour") + ":" + (if (minute < 10) "0$minute" else minute)
            }
            hour == 0 -> {
                "AM " + (hour + 12) + ":" + (if (minute < 10) "0$minute" else minute)
            }
            hour == 12 -> {
                "PM " + hour + ":" + (if (minute < 10) "0$minute" else minute)
            }
            else -> {
                "AM " + (if (hour < 10) "0$hour" else hour) + ":" + (if (minute < 10) "0$minute" else minute)
            }
        }
    }

    private fun get12hKoreanTimeFormat(hour: Int, minute: Int): String {
        return when {
            hour > 12 -> {
                "오후 " + (if (hour > 12)
                    if ((hour - 12) < 10) "0" + (hour - 12) else hour - 12
                else "0$hour") + ":" + (if (minute < 10) "0$minute" else minute)
            }
            hour == 0 -> {
                "오전 " + "12:" + (if (minute < 10) "0$minute" else minute)
            }
            hour == 12 -> {
                "오후 " + "12:" + (if (minute < 10) "0$minute" else minute)
            }
            else -> {
                "오전 " + (if (hour < 10) "0$hour" else hour) + ":" + (if (minute < 10) "0$minute" else minute)
            }
        }
    }

    fun convertMillTo12hTimeFormat(timeString: String): String {
        val dateFormatTime = convertMillToDate(timeString, "HH:mm")
        val splitDateFormatTime = dateFormatTime.split(":")
        val hour = splitDateFormatTime[0].toInt()
        val minute = splitDateFormatTime[1].toInt()
        return get12hTimeFormat(hour, minute)
    }

    fun convertMillTo12hKoreanTimeFormat(timeString: String): String {
        val dateFormatTime = convertMillToDate(timeString, "HH:mm")
        val splitDateFormatTime = dateFormatTime.split(":")
        val hour = splitDateFormatTime[0].toInt()
        val minute = splitDateFormatTime[1].toInt()
        return get12hKoreanTimeFormat(hour, minute)
    }

    private fun convertMillToDate(dateInMilliseconds: String, dateFormat: String?): String {
        return DateFormat.format(/* inFormat = */ dateFormat, /* inTimeInMillis = */
            dateInMilliseconds.toLong()
        ).toString()
    }

    @SuppressLint("SimpleDateFormat")
    fun convertUnixTimeToString(unixTime: Long?, format: String?): String? {
        val simpleDateFormat = SimpleDateFormat(format)
        val date = Date(unixTime?.times(1000L)!!)
        return simpleDateFormat.format(date)
    }

    @SuppressLint("SimpleDateFormat")
    fun convertMillTimeToString(millTime: Long?, format: String?): String? {
        val simpleDateFormat = SimpleDateFormat(format)
        val date = Date(millTime!!)
        return simpleDateFormat.format(date)
    }

    fun getDayWeek(time: Long): String {
        val date = Date(time)
        val calendar = Calendar.getInstance()
        calendar.time = date
        val dayWeek = calendar.get(Calendar.DAY_OF_WEEK)
        val result: String
        when (dayWeek) {
            1 -> {
                result = "일"
            }
            2 -> {
                result = "월"
            }
            3 -> {
                result = "화"
            }
            4 -> {
                result = "수"
            }
            5 -> {
                result = "목"
            }
            6 -> {
                result = "금"
            }
            7 -> {
                result = "토"
            }
            else -> {
                result = ""
            }
        }
        return result
    }

    fun getDayWeek(timeString: String, format: String): String {
        val dateFormat = SimpleDateFormat(format, Locale("ko", "KR"))
        val date = dateFormat.parse(timeString)
        val cal = Calendar.getInstance()
        if (date != null) {
            cal.time = date
        }
        val dayWeek = cal.get(Calendar.DAY_OF_WEEK)

        val result: String
        when (dayWeek) {
            1 -> {
                result = "일"
            }
            2 -> {
                result = "월"
            }
            3 -> {
                result = "화"
            }
            4 -> {
                result = "수"
            }
            5 -> {
                result = "목"
            }
            6 -> {
                result = "금"
            }
            7 -> {
                result = "토"
            }
            else -> {
                result = ""
            }
        }
        return result
    }

    fun formatterDate(format: String): DateTimeFormatter? {
        return DateTimeFormatter.ofPattern(format)
    }

    fun getDaysInMonth(date: LocalDateTime): Int {
        return when (date.monthValue - 1) {
            Calendar.JANUARY, Calendar.MARCH, Calendar.MAY, Calendar.JULY,
            Calendar.AUGUST, Calendar.OCTOBER, Calendar.DECEMBER -> 31
            Calendar.APRIL, Calendar.JUNE, Calendar.SEPTEMBER, Calendar.NOVEMBER -> 30
            Calendar.FEBRUARY ->
                if (date.year % 4 == 0 && date.year % 100 != 0 || date.year % 400 == 0) 29 else 28
            else -> throw IllegalArgumentException("Invalid Month")
        }
    }

    @SuppressLint("SimpleDateFormat")
    fun getDateStr(timeString: String, dateFormatStr: String, stringFormatStr: String): String {
        var simpleDateFormat = SimpleDateFormat(dateFormatStr)
        val date = simpleDateFormat.parse(timeString)
        simpleDateFormat = SimpleDateFormat(stringFormatStr)
        return simpleDateFormat.format(date!!)
    }

    @SuppressLint("SimpleDateFormat")
    fun getTimeStr(timeString: String, utcHour: Int, utcMinute: Int, formatStr: String): String {
        var simpleDateFormat = SimpleDateFormat(formatStr)
        val time = simpleDateFormat.parse(timeString)
        simpleDateFormat = SimpleDateFormat(formatStr)
        val timeStr = simpleDateFormat.format(time!!)
        val hour = timeStr.split(":")[0].toInt()
        val minute = timeStr.split(":")[1].toInt()
        return get12hKoreanTimeFormat(hour + utcHour, minute + utcMinute)
    }
}