package io.github.aidenkoog.apptemplate.utils

import android.app.NotificationManager
import android.service.notification.StatusBarNotification

object NotificationBarControlUtils {

    private const val NOTIFICATION_LIMIT = 8


    /**
     * sequence.
     * 1. get notifications corresponding to my app from activated notification list.
     * 2. check my notification count.
     * 3. delete oldest notification if current notification count exceeds the limit.
     */
    fun precondition(manager: NotificationManager) {
        val myAppNotifications = getMyAppNotifications(getActiveNotifications(manager))
        if (hasExceededNotification(myAppNotifications)) {
            removeOldestMyAppNotification(manager, getOldestNotification(myAppNotifications))
        }
    }

    /**
     * delete oldest notification of my app.
     */
    private fun removeOldestMyAppNotification(
        manager: NotificationManager, notification: StatusBarNotification,
    ) = manager.cancel(notification.id)

    /**
     * check if notification count is exceeded to limit.
     * -1 reason : check notification state before notifying it.
     */
    private fun hasExceededNotification(list: MutableList<StatusBarNotification>): Boolean =
        list.size > NOTIFICATION_LIMIT - 1

    /**
     * get all notifications which stack in system.
     */
    private fun getActiveNotifications(manager: NotificationManager): Array<StatusBarNotification> =
        manager.activeNotifications

    /**
     * get oldest notification object of my app.
     */
    private fun getOldestNotification(list: MutableList<StatusBarNotification>): StatusBarNotification {
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

    /**
     * From all notifications in system, extract notifications corresponding to my app.
     */
    private fun getMyAppNotifications(notifications: Array<StatusBarNotification>): MutableList<StatusBarNotification> {
        val list = mutableListOf<StatusBarNotification>()
        for (notification in notifications) {
            if (notification.packageName != "my package name") continue
            if (notification.tag != null) continue  // exclude bar group type.
            list.add(notification)
        }
        return list
    }
}