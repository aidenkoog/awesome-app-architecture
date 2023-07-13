package io.github.aidenkoog.testapp.utils

import android.app.NotificationManager
import android.service.notification.StatusBarNotification

object NotificationBarControlUtils {

    private const val NOTIFICATION_LIMIT = 20
    private const val APP_PACKAGE_NAME = ""

    /* 외부 open 용 메소드 */
    fun precondition(manager: NotificationManager) {
        val customNotifications = getCustomNotifications(getActiveNotifications(manager))
        if (hasExceededNotification(customNotifications)) {
            removeOldestCustomNotification(manager, getOldestNotification(customNotifications))
        }
    }

    /* 가장 오래된 노티피케이션 삭제 */
    private fun removeOldestCustomNotification(
        manager: NotificationManager, notification: StatusBarNotification
    ) = manager.cancel(notification.id)

    /* 노티피케이션 개수가 초과되었는지 확인 */
    private fun hasExceededNotification(list: MutableList<StatusBarNotification>): Boolean =
        list.size > NOTIFICATION_LIMIT

    /* 쌓여있는 전체 노티피케이션 리스트 획득 */
    private fun getActiveNotifications(manager: NotificationManager): Array<StatusBarNotification> =
        manager.activeNotifications

    /* 가장 오래된 노티피케이션 오브젝트 획득 */
    private fun getOldestNotification(list: MutableList<StatusBarNotification>): StatusBarNotification {
        lateinit var oldestItem: StatusBarNotification
        for ((index, item) in list.withIndex()) {
            if (index == 0) {
                oldestItem = item
                continue
            }
            // 노티피케이션 포스팅 시간으로 비교하여 가장 과거의 노티피케이션 아이템 탐색
            if (oldestItem.postTime > item.postTime) {
                oldestItem = item
            }
        }
        return oldestItem
    }

    /* 전체 노티피케이션 리스트에서 앱 패키지 명에 해당하는 노티피케이션 리스트만 추출 */
    private fun getCustomNotifications(notifications: Array<StatusBarNotification>): MutableList<StatusBarNotification> {
        val list = mutableListOf<StatusBarNotification>()
        for (notification in notifications) {
            val packageName = notification.packageName
            if (packageName != APP_PACKAGE_NAME) continue
            list.add(notification)
        }
        return list
    }
}