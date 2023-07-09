package io.github.aidenkoog.testapp.services

import android.accessibilityservice.AccessibilityService
import android.annotation.SuppressLint
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.graphics.PixelFormat
import android.os.Build
import android.util.Log
import android.view.Gravity
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityEvent.TYPE_NOTIFICATION_STATE_CHANGED
import android.view.accessibility.AccessibilityEvent.TYPE_VIEW_SCROLLED
import android.view.accessibility.AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED
import android.view.accessibility.AccessibilityNodeInfo
import android.widget.Button
import android.widget.Toast
import androidx.core.app.NotificationCompat
import io.github.aidenkoog.testapp.R
import io.github.aidenkoog.testapp.presentation.intro.IntroActivity
import kotlin.math.abs


class CustomAccessibilityService : AccessibilityService(), View.OnTouchListener,
    View.OnClickListener {

    companion object {
        const val TAG = "aidenkoog"
        const val MSG_TAG = "koo: "
        const val COMPARISON_KEYWORD = "해외 로밍"
        const val COMPARISON_KEYWORD_2 = "T 로밍"
        const val COMPARISON_KEYWORD_3 = "모바일 네트워크"
        const val COMPARISON_KEYWORD_4 = "설정"
        const val COMPARISON_KEYWORD_5 = "애플리케이션"
        const val COMPARISON_KEYWORD_6 = "소프트웨어 업데이트"
        const val COMPARISON_KEYWORD_ENG = "Global roaming"
        const val TEST_CONSTANT = "aidenkoog"
        const val NOTIFICATION_ID = 164677
    }

    private var textViewNodeList: ArrayList<AccessibilityNodeInfo>? = null

    private var editTextViewNodeList: ArrayList<AccessibilityNodeInfo>? = null

    private var isDestinationScreen = false
    private var existKeyword = false

    private var windowManager: WindowManager? = null
    private var windowView: View? = null

    private var topLeftView: View? = null

    private var offsetX = 0f
    private var offsetY = 0f
    private var originalXPos = 0
    private var originalYPos = 0
    private var moving = false

    private var overlayedButton: Button? = null

    @SuppressLint("ResourceType", "ObsoleteSdkInt", "InflateParams")
    override fun onAccessibilityEvent(accessibilityEvent: AccessibilityEvent) {

        val eventType: Int = accessibilityEvent.eventType
        val className = accessibilityEvent.className.toString()
        Log.e(TAG, "${MSG_TAG}onAccessibilityEvent: " + eventType + ", className : " + className)

        if (eventType == TYPE_NOTIFICATION_STATE_CHANGED) { // 64
            Log.d(TAG, "koo: onAccessibilityEvent: " + "TYPE_NOTIFICATION_STATE_CHANGED")

        } else if (eventType == TYPE_WINDOW_STATE_CHANGED) {    // 32
            Log.d(TAG, "koo: onAccessibilityEvent: " + "TYPE_WINDOW_STATE_CHANGED")
            if (!className.contains("settings") || !className.contains("Settings")) {
                if (className != "android.view.View") {
                    releaseResources()
                }
            }

        } else if (eventType == TYPE_VIEW_SCROLLED) {   // 4096
            Log.d(TAG, "koo: onAccessibilityEvent: " + "TYPE_VIEW_SCROLLED")

        } else if (eventType == AccessibilityEvent.TYPE_VIEW_TEXT_CHANGED) {    // 16
            Log.d(TAG, "koo: onAccessibilityEvent: " + "TYPE_VIEW_TEXT_CHANGED")
            val rootNodeInActiveWindow = rootInActiveWindow

            editTextViewNodeList = ArrayList()
            findChildEditTextViews(rootNodeInActiveWindow)
            for ((index, node) in editTextViewNodeList!!.withIndex()) {
                if (node.text == null) {
                    return
                }
                val nodeText = node.text.toString()
                Toast.makeText(applicationContext, "InputText: $nodeText", Toast.LENGTH_SHORT)
                    .show()
                Log.e(TAG, "koo: ${MSG_TAG}edit text: $nodeText, index: ${index + 1}")
            }

        } else if (eventType == AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED) { // 2048
            Log.d(TAG, "koo: onAccessibilityEvent: " + "TYPE_WINDOW_CONTENT_CHANGED")
            val rootNodeInActiveWindow = rootInActiveWindow

            editTextViewNodeList = ArrayList()
            findChildEditTextViews(rootNodeInActiveWindow)
            for ((index, node) in editTextViewNodeList!!.withIndex()) {
                if (node.text == null) {
                    return
                }
                val nodeText = node.text.toString()
                Toast.makeText(applicationContext, "InputText: $nodeText", Toast.LENGTH_SHORT)
                    .show()
                Log.e(TAG, "koo: ${MSG_TAG}edit text: $nodeText, index: ${index + 1}")
            }

            textViewNodeList = ArrayList()
            findChildViews(rootNodeInActiveWindow)
            existKeyword = false
            for ((index, node) in textViewNodeList!!.withIndex()) {
                if (node.text == null) {
                    return
                }
                val nodeText = node.text.toString()
                if (index == 1) {
                    Toast.makeText(
                        applicationContext, "Screen Info: $nodeText", Toast.LENGTH_SHORT
                    ).show()
                }
                Log.e(TAG, "${MSG_TAG}textview text: $nodeText, index: ${index + 1}")

                val comparisonKeyword = COMPARISON_KEYWORD
                val comparisonKeywordEng = COMPARISON_KEYWORD_ENG
                val comparisonKeyword2 = COMPARISON_KEYWORD_2
                val comparisonKeyword3 = COMPARISON_KEYWORD_3
                if (comparisonKeyword == nodeText || comparisonKeywordEng == nodeText || comparisonKeyword2 == nodeText || comparisonKeyword3 == nodeText) {
                    if (index == 1) {
                        Log.e(TAG, "${MSG_TAG}onAccessibilityEvent: found keyword in screen!")
                        existKeyword = true
                        isDestinationScreen = true
                    } else {
                        existKeyword = false
                        isDestinationScreen = false
                    }
                }
            }

            if (!existKeyword) {
                Log.e(
                    TAG,
                    "koo: NO Keyword!!!!!!!!!!!!, windowManager: $windowManager, windowView: $windowView"
                )
                windowManager?.let {
                    windowView?.let {
                        if (it.parent != null) {
                            Log.e(TAG, "koo: onAccessibilityEvent: parent NOT null, remove it")
                            windowManager?.removeView(it)
                        } else {
                            Log.e(TAG, "koo: onAccessibilityEvent: parent null")
                            try {
                                windowManager?.removeView(it)
                            } catch (e: Exception) {
                                e.printStackTrace()
                            }
                        }
                    }
                }
            }

            if (isDestinationScreen && existKeyword) {
                addCustomViews()
                val inflate = getSystemService(LAYOUT_INFLATER_SERVICE) as LayoutInflater
                windowManager = getSystemService(WINDOW_SERVICE) as WindowManager

                val params = WindowManager.LayoutParams(
                    WindowManager.LayoutParams.WRAP_CONTENT,
                    WindowManager.LayoutParams.WRAP_CONTENT,
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY or WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE
                    }
                    // Set to TYPE_APPLICATION_OVERLAY for Android O and higher
                    else WindowManager.LayoutParams.TYPE_SYSTEM_ALERT,
                    WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH,
                    PixelFormat.TRANSLUCENT
                )
                params.gravity = Gravity.CENTER_HORIZONTAL
                params.y = 370
                params.title = "TEST!!!!"

                windowView = inflate.inflate(R.layout.overlay_layout, null)
                windowManager!!.addView(windowView, params)

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
        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager
        overlayedButton = Button(this)
        overlayedButton!!.text = "설정 가이드"
        overlayedButton!!.setOnTouchListener(this)
        overlayedButton!!.alpha = 0.5f
        overlayedButton!!.setBackgroundColor(0x55fe4444)
        overlayedButton!!.setOnClickListener(this)

        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY or WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE
            }
            // Set to TYPE_APPLICATION_OVERLAY for Android O and higher
            else WindowManager.LayoutParams.TYPE_SYSTEM_ALERT,
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
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY or WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE
            }
            // Set to TYPE_APPLICATION_OVERLAY for Android O and higher
            else WindowManager.LayoutParams.TYPE_SYSTEM_ALERT,
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

    override fun onInterrupt() {
        Log.e(TAG, "$MSG_TAG onInterrupt()")
    }

    private fun findChildEditTextViews(parentView: AccessibilityNodeInfo) {
        if (parentView.className == null) {
            return
        }
        val childCount = parentView.childCount
        Log.e(TAG, "${MSG_TAG}childCount: " + childCount)

        if (childCount == 0 && (parentView.className.toString()
                .contentEquals("android.widget.EditText"))
        ) {
            editTextViewNodeList!!.add(parentView)
        } else {
            for (i in 0 until childCount) {
                if (parentView.getChild(i) == null) {
                    continue
                }
                findChildEditTextViews(parentView.getChild(i))
            }
        }
    }

    private fun findChildViews(parentView: AccessibilityNodeInfo) {
        if (parentView.className == null) {
            return
        }
        val childCount = parentView.childCount
        Log.e(TAG, "${MSG_TAG}childCount: " + childCount)

        if (childCount == 0 && (parentView.className.toString()
                .contentEquals("android.widget.TextView"))
        ) {
            textViewNodeList!!.add(parentView)
        } else {
            for (i in 0 until childCount) {
                if (parentView.getChild(i) == null) {
                    continue
                }
                findChildViews(parentView.getChild(i))
            }
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        startForeground(NOTIFICATION_ID, createNotification(this))
        Log.e(TAG, "onStartCommand: ")

        return START_STICKY
    }

    @SuppressLint("ObsoleteSdkInt")
    private fun createNotification(context: Context): Notification {

        val notifyIntent = Intent(context, IntroActivity::class.java)
        val notifyPendingIntent =
            PendingIntent.getActivity(context, 0, notifyIntent, PendingIntent.FLAG_IMMUTABLE)

        val builder = NotificationCompat.Builder(context, TEST_CONSTANT)
        builder.setWhen(System.currentTimeMillis())
        builder.setSmallIcon(R.mipmap.ic_launcher)
        builder.setContentTitle(TEST_CONSTANT)
        builder.setContentText(TEST_CONSTANT)
        builder.setOngoing(true)
        builder.priority = NotificationCompat.PRIORITY_MIN
        builder.setCategory(NotificationCompat.CATEGORY_SERVICE)
        builder.setContentIntent(notifyPendingIntent)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val name: CharSequence = TEST_CONSTANT
            val description = TEST_CONSTANT
            val importance = NotificationManager.IMPORTANCE_LOW
            val channel = NotificationChannel(TEST_CONSTANT, name, importance)
            channel.description = description
            val notificationManager = getSystemService(
                NotificationManager::class.java
            )
            notificationManager.createNotificationChannel(channel)
        }
        return builder.build()
    }

    override fun onTouch(v: View?, event: MotionEvent): Boolean {
        if (event.action == MotionEvent.ACTION_DOWN) {
            val x = event.rawX
            val y = event.rawY
            moving = false
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
            if (abs(newX - originalXPos) < 1 && abs(newY - originalYPos) < 1 && !moving) {
                return false
            }
            params.x = newX - topLeftLocationOnScreen[0]
            params.y = newY - topLeftLocationOnScreen[1]
            windowManager!!.updateViewLayout(overlayedButton, params)
            moving = true
        } else if (event.action == MotionEvent.ACTION_UP) {
            if (moving) {
                return true
            }
        }
        return false
    }

    override fun onDestroy() {
        super.onDestroy()
        releaseResources()
    }

    private fun releaseResources() {
        if (overlayedButton != null) {
            if (windowManager != null) {
                windowManager!!.removeView(overlayedButton)
                windowManager!!.removeView(topLeftView)
            }
            overlayedButton = null
            topLeftView = null
        }
    }

    override fun onClick(v: View?) {
        Toast.makeText(this, "가이드를 표시합니다.", Toast.LENGTH_SHORT).show()
    }
}
