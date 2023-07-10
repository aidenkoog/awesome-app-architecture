package io.github.aidenkoog.testapp.utils

import android.view.accessibility.AccessibilityNodeInfo
import com.orhanobut.logger.Logger

object ViewNodeUtils {

    fun loadChildViews(
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
        Logger.e("parent class name: ${parentView.className}")

        val styleArray = compareViewStyle.split("|")

        if (styleArray.size == 1) {
            if (childCount == 0 && (parentView.className.toString()
                    .contentEquals(compareViewStyle))
            ) {
                nodeList.add(parentView)

            } else {
                for (i in 0 until childCount) {
                    if (parentView.getChild(i) == null) continue
                    loadChildViews(parentView.getChild(i), nodeList, compareViewStyle)
                }
            }
        } else if (styleArray.size > 1) {
            for (i in 1 until styleArray.size) {
                if (childCount == 0 && (parentView.className.toString()
                        .contentEquals(styleArray[i]))
                ) {
                    nodeList.add(parentView)
                }
            }
            if (!(childCount == 0 && (parentView.className.toString()
                    .contentEquals(compareViewStyle))
            )) {
                for (i in 0 until childCount) {
                    if (parentView.getChild(i) == null) continue
                    loadChildViews(parentView.getChild(i), nodeList, compareViewStyle)
                }
            }
        }
    }
}