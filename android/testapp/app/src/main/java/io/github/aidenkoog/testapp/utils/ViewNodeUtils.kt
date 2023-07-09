package io.github.aidenkoog.testapp.utils

import android.view.accessibility.AccessibilityNodeInfo
import com.orhanobut.logger.Logger

object ViewNodeUtils {

    fun findChildViews(
        parentView: AccessibilityNodeInfo,
        nodeList: ArrayList<AccessibilityNodeInfo>,
        compareViewStyle: String
    ) {
        if (parentView.className == null) {
            Logger.e("parentView.className is null !!!")
            return
        }
        val childCount = parentView.childCount
        Logger.e("childCount: $childCount")

        if (childCount == 0 && (parentView.className.toString()
                .contentEquals(compareViewStyle))
        ) {
            nodeList.add(parentView)
        } else {
            for (i in 0 until childCount) {
                if (parentView.getChild(i) != null) {
                    findChildViews(parentView.getChild(i), nodeList, compareViewStyle)
                }
            }
        }
    }
}