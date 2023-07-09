package io.github.aidenkoog.testapp.services

import android.accessibilityservice.AccessibilityService
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.graphics.PixelFormat
import android.view.Gravity
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED
import android.view.accessibility.AccessibilityNodeInfo
import android.widget.Button
import android.widget.Toast
import androidx.core.app.NotificationCompat
import com.orhanobut.logger.Logger
import io.github.aidenkoog.testapp.R
import io.github.aidenkoog.testapp.presentation.intro.IntroActivity
import io.github.aidenkoog.testapp.services.child_style.ChildViewStyle
import io.github.aidenkoog.testapp.services.screen_comparison.ScreenTitle
import io.github.aidenkoog.testapp.utils.ViewNodeUtils.findChildViews
import kotlin.math.abs


class CustomAccessibilityService : AccessibilityService(), View.OnTouchListener,
    View.OnClickListener {

    companion object {
        const val NOTIFICATION_ID = 164677
    }

    private var textViewNodeList = ArrayList<AccessibilityNodeInfo>()
    private var editTextNodeList = ArrayList<AccessibilityNodeInfo>()

    private var isDestinationScreen = false
    private var existKeyword = false

    private var windowManager: WindowManager? = null
    private var windowView: View? = null

    private var topLeftView: View? = null
    private var overlayedButton: Button? = null

    private var offsetX = 0f
    private var offsetY = 0f
    private var originalXPos = 0
    private var originalYPos = 0
    private var isOverlayViewMoving = false

    override fun onInterrupt() = Logger.i("onInterrupt:")

    override fun onServiceConnected() {
        super.onServiceConnected()
        Logger.i("onServiceConnected:")
        initialize()
    }

    private fun initialize() {
        Logger.i("initialize:")
        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Logger.i("onStartCommand:")
        startForeground(NOTIFICATION_ID, createNotification(this))

        return START_STICKY
    }

    override fun onDestroy() {
        Logger.i("onDestroy:")
        super.onDestroy()
        releaseResources()
    }

    private fun releaseResources() {
        Logger.i("releaseResources:")
        if (overlayedButton != null) {
            if (windowManager != null) {
                windowManager!!.removeView(overlayedButton)
                windowManager!!.removeView(topLeftView)
            }
            overlayedButton = null
            topLeftView = null
        }
    }

    private fun isTitleWithOverlayView(nodeText: String): Boolean {
        val isTitleWithOverlayView: Boolean

        val isKrMobileNetworkTitle = ScreenTitle.KR_MOBILE_NETWORK.title == nodeText
        val isKrRoamingAbroadTitle = ScreenTitle.KR_ROAMING_ABROAD.title == nodeText
        val isEnRoamingAbroadTitle = ScreenTitle.EN_ROAMING_ABROAD.title == nodeText
        val isKrTRoamingTitle = ScreenTitle.KR_T_ROAMING.title == nodeText
        val isKrDisplayTitle = ScreenTitle.KR_DISPLAY.title == nodeText
        val isKrNormalTitle = ScreenTitle.KR_NORMAL.title == nodeText

        isTitleWithOverlayView =
            isKrRoamingAbroadTitle || isKrMobileNetworkTitle
                    || isEnRoamingAbroadTitle || isKrTRoamingTitle
                    || isKrDisplayTitle || isKrNormalTitle

        Logger.d("isTitleWithOverlayView: $isTitleWithOverlayView")
        return isTitleWithOverlayView
    }

    private fun isOnSettingsApp(className: String): Boolean {
        if (!className.contains("settings") || !className.contains("Settings")) {
            if (className != "android.view.View") return false
        }
        return true
    }

    private fun createNotification(context: Context): Notification {
        Logger.i("createNotification:")

        val channel = NotificationChannel(
            resources.getString(R.string.notification_channel_id),
            resources.getString(R.string.notification_channel_name),
            NotificationManager.IMPORTANCE_LOW
        )
        channel.description = resources.getString(R.string.notification_channel_desc)

        val notificationManager = getSystemService(NotificationManager::class.java)
        notificationManager.createNotificationChannel(channel)

        return createNotificationBuilder(context).build()
    }

    private fun createNotificationBuilder(context: Context): NotificationCompat.Builder {
        Logger.i("setupNotificationBuilder:")

        val notifyPendingIntent = PendingIntent.getActivity(
            context, 0, Intent(context, IntroActivity::class.java), PendingIntent.FLAG_IMMUTABLE
        )

        val builder = NotificationCompat.Builder(
            context, resources.getString(R.string.notification_channel_id)
        )
        builder.setWhen(System.currentTimeMillis())
        builder.setSmallIcon(R.mipmap.ic_launcher)
        builder.setContentTitle(resources.getString(R.string.notification_content_title))
        builder.setContentText(resources.getString(R.string.notification_content_text))

        builder.setOngoing(true)
        builder.priority = NotificationCompat.PRIORITY_MIN
        builder.setCategory(NotificationCompat.CATEGORY_SERVICE)
        builder.setContentIntent(notifyPendingIntent)

        return builder
    }

    override fun onAccessibilityEvent(accessibilityEvent: AccessibilityEvent) {

        val eventType: Int = accessibilityEvent.eventType
        val className = accessibilityEvent.className.toString()

        if (eventType == TYPE_WINDOW_STATE_CHANGED) {    // 32
            if (!isOnSettingsApp(className = className)) {
                releaseResources()
            }

        } else if (eventType == AccessibilityEvent.TYPE_VIEW_TEXT_CHANGED) {    // 16
            findChildViews(
                parentView = rootInActiveWindow,
                nodeList = editTextNodeList,
                compareViewStyle = ChildViewStyle.CHILD_EDIT_TEXT.viewStyle
            )
            for (node in editTextNodeList) {
                val nodeText = (node.text ?: "").toString()
            }

        } else if (eventType == AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED) { // 2048
            findChildViews(
                parentView = rootInActiveWindow,
                nodeList = editTextNodeList,
                compareViewStyle = ChildViewStyle.CHILD_EDIT_TEXT.viewStyle
            )
            for (node in editTextNodeList) {
                val nodeText = (node.text ?: "").toString()
            }

            textViewNodeList = ArrayList()
            findChildViews(
                nodeList = textViewNodeList,
                parentView = rootInActiveWindow,
                compareViewStyle = ChildViewStyle.CHILD_TEXT_VIEW.viewStyle
            )
            existKeyword = false
            for ((index, node) in textViewNodeList.withIndex()) {
                val nodeText = (node.text ?: "").toString()
                if (isTitleWithOverlayView(nodeText)) {
                    if (index == 1) {
                        existKeyword = true
                        isDestinationScreen = true
                    } else {
                        existKeyword = false
                        isDestinationScreen = false
                    }
                }
            }

            if (isDestinationScreen && existKeyword) {
                addCustomViews()

            } else {
                windowManager?.let {
                    windowView?.let {
                        if (it.parent != null) {
                            windowManager?.removeView(it)
                            windowView = null
                        }
                    }
                }
            }
        }
    }

    private fun addCustomViews() {
        if (overlayedButton != null) {
            return
        }
        overlayedButton = Button(this)
        overlayedButton!!.text = "설정 가이드"
        overlayedButton!!.setOnTouchListener(this)
        overlayedButton!!.alpha = 0.5f
        overlayedButton!!.setBackgroundColor(0x55fe4444)
        overlayedButton!!.setOnClickListener(this)

        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY or WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH,
            PixelFormat.TRANSLUCENT
        )
        params.gravity = Gravity.LEFT or Gravity.TOP
        params.x = 0
        params.y = 0
        windowManager!!.addView(
            overlayedButton, params
        )

        topLeftView = View(this)
        val topLeftParams = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY or WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH,
            PixelFormat.TRANSLUCENT
        )
        topLeftParams.gravity = Gravity.LEFT or Gravity.TOP
        topLeftParams.x = 0
        topLeftParams.y = 0
        topLeftParams.width = 0
        topLeftParams.height = 0
        windowManager!!.addView(topLeftView, topLeftParams)
    }

    override fun onTouch(v: View?, event: MotionEvent): Boolean {
        if (event.action == MotionEvent.ACTION_DOWN) {
            val x = event.rawX
            val y = event.rawY
            isOverlayViewMoving = false
            val location = IntArray(2)
            overlayedButton!!.getLocationOnScreen(location)
            originalXPos = location[0]
            originalYPos = location[1]
            offsetX = originalXPos - x
            offsetY = originalYPos - y

        } else if (event.action == MotionEvent.ACTION_MOVE) {
            val topLeftLocationOnScreen = IntArray(2)
            topLeftView!!.getLocationOnScreen(topLeftLocationOnScreen)
            val x = event.rawX
            val y = event.rawY
            val params: WindowManager.LayoutParams =
                overlayedButton!!.layoutParams as WindowManager.LayoutParams
            val newX = (offsetX + x).toInt()
            val newY = (offsetY + y).toInt()
            if (abs(newX - originalXPos) < 1 && abs(newY - originalYPos) < 1 && !isOverlayViewMoving) {
                return false
            }
            params.x = newX - topLeftLocationOnScreen[0]
            params.y = newY - topLeftLocationOnScreen[1]
            windowManager!!.updateViewLayout(overlayedButton, params)
            isOverlayViewMoving = true
        } else if (event.action == MotionEvent.ACTION_UP) {
            if (isOverlayViewMoving) {
                return true
            }
        }
        return false
    }

    override fun onClick(v: View?) {
        Toast.makeText(this, "가이드를 표시합니다.", Toast.LENGTH_SHORT).show()
    }
}
