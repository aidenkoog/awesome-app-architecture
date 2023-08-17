package io.github.aidenkoog.android.util

import android.app.NotificationManager
import android.service.notification.StatusBarNotification

object NotificationBarControlUtils {

    private const val NOTIFICATION_LIMIT = 20
    private const val PACKAGE_NAME = ""

    fun precondition(manager: NotificationManager) {
        val myAppNotifications = getMyAppNotifications(getActiveNotifications(manager))
        if (hasExceededNotification(myAppNotifications)) {
            removeOldestMyAppNotification(manager, getOldestNotification(myAppNotifications))
        }
    }

    private fun removeOldestMyAppNotification(
        manager: NotificationManager, notification: StatusBarNotification
    ) = manager.cancel(notification.id)

    private fun hasExceededNotification(list: MutableList<StatusBarNotification>): Boolean =
        list.size > NOTIFICATION_LIMIT - 1

    private fun getActiveNotifications(manager: NotificationManager): Array<StatusBarNotification> =
        manager.activeNotifications

    private fun getOldestNotification(list: MutableList<StatusBarNotification>)
            : StatusBarNotification {
        lateinit var oldestItem: StatusBarNotification
        for ((index, item) in list.withIndex()) {
            if (index == 0) {
                oldestItem = item
                continue
            }
            if (oldestItem.postTime > item.postTime) {
                oldestItem = item
            }
        }
        return oldestItem
    }

    private fun getMyAppNotifications(notifications: Array<StatusBarNotification>)
            : MutableList<StatusBarNotification> {
        val list = mutableListOf<StatusBarNotification>()
        for (notification in notifications) {
            if (notification.packageName != PACKAGE_NAME) continue
            if (notification.tag != null) continue
            list.add(notification)
        }
        return list
    }
}