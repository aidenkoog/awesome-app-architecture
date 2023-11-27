package io.github.aidenkoog.apptemplate.utils

import java.time.Instant
import java.time.ZoneId

object TimeUtils {

    private const val ZONE_ID_ASIA_SEOUL = "Asia/Seoul"

    /**
     * utc formatted string to milliseconds.
     */
    @JvmStatic
    fun utcToTimestamp(callTime: String?): Long {
        runCatching {
            val timeStamp = Instant.parse(callTime)
            val zonedDateTime = timeStamp.atZone(ZoneId.of(ZONE_ID_ASIA_SEOUL))

            return zonedDateTime.toInstant().toEpochMilli()

        }.onFailure { e ->
            e.printStackTrace()

        }.also {
            return 0
        }
    }
}