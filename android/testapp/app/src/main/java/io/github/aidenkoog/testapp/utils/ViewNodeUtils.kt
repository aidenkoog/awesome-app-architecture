package io.github.aidenkoog.testapp.utils

import android.content.Context
import android.graphics.PixelFormat
import android.graphics.Typeface
import android.view.Gravity
import android.view.View.OnTouchListener
import android.view.WindowManager.LayoutParams
import android.view.accessibility.AccessibilityNodeInfo
import android.widget.Button
import android.widget.LinearLayout
import androidx.core.content.ContextCompat
import com.orhanobut.logger.Logger
import io.github.aidenkoog.testapp.R

object ViewNodeUtils {

    fun getDefaultLayoutParams(): LayoutParams = LayoutParams(
        LayoutParams.WRAP_CONTENT,
        LayoutParams.WRAP_CONTENT,
        LayoutParams.TYPE_APPLICATION_OVERLAY
                or LayoutParams.FLAG_NOT_TOUCHABLE,
        LayoutParams.FLAG_NOT_FOCUSABLE
                or LayoutParams.FLAG_NOT_TOUCH_MODAL
                or LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH,
        PixelFormat.TRANSLUCENT
    )

    fun getParentLayoutParams(defaultLayoutParams: LayoutParams): LayoutParams {
        defaultLayoutParams.gravity = Gravity.START or Gravity.CENTER_VERTICAL
        defaultLayoutParams.x = 0
        defaultLayoutParams.y = 0
        return defaultLayoutParams
    }

    fun getTopLeftLayoutParams(defaultLayoutParams: LayoutParams): LayoutParams {
        defaultLayoutParams.gravity = Gravity.START or Gravity.CENTER_VERTICAL
        defaultLayoutParams.x = 0
        defaultLayoutParams.y = 0
        defaultLayoutParams.width = 0
        defaultLayoutParams.height = 0
        return defaultLayoutParams
    }

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
                        )
            ) {
                for (i in 0 until childCount) {
                    if (parentView.getChild(i) == null) continue
                    loadChildViews(parentView.getChild(i), nodeList, compareViewStyle)
                }
            }
        }
    }

    fun makeOverlayViewItem(
        context: Context,
        touchListener: OnTouchListener,
        itemId: Int,
        itemText: String,
        itemTextSize: Float,
        itemBgColor: Int
    ): Button {
        val overlayViewItem = Button(context)
        return overlayViewItem.apply {
            id = itemId
            text = itemText
            textSize = itemTextSize
            gravity = Gravity.CENTER
            setOnTouchListener(touchListener)
            setTypeface(this.typeface, Typeface.BOLD)
            setPadding(7, 7, 7, 7)
            setBackgroundColor(itemBgColor)
            setTextColor(ContextCompat.getColor(context, R.color.black))
        }
    }

    fun makeOverlayViewParent(context: Context, vararg items: Button): LinearLayout {
        val overlayParentView = LinearLayout(context)
        return overlayParentView.apply {
            orientation = LinearLayout.VERTICAL
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT
            )
            gravity = Gravity.START or Gravity.CENTER_VERTICAL
            setPadding(7, 7, 7, 7)
            setBackgroundColor(0x55ffffee)
            for (item in items) {
                addView(item)
            }
        }
    }
}