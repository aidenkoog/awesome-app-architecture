package io.github.aidenkoog.testapp.services

import android.accessibilityservice.AccessibilityService
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.graphics.PixelFormat
import android.graphics.Typeface
import android.view.Gravity
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import android.widget.Button
import android.widget.LinearLayout
import android.widget.Toast
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat
import com.orhanobut.logger.Logger
import io.github.aidenkoog.testapp.R
import io.github.aidenkoog.testapp.presentation.intro.IntroActivity
import io.github.aidenkoog.testapp.services.child_style.ChildViewStyle
import io.github.aidenkoog.testapp.services.event_type.AccessibilityEventType
import io.github.aidenkoog.testapp.services.screen_comparison.ScreenTitle
import io.github.aidenkoog.testapp.utils.DialogUtils
import io.github.aidenkoog.testapp.utils.PermissionUtils
import io.github.aidenkoog.testapp.utils.ViewNodeUtils.loadChildViews
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import kotlin.math.abs


class CustomAccessibilityService : AccessibilityService(), View.OnTouchListener,
    View.OnClickListener {

    companion object {
        const val NOTIFICATION_ID = 1000
        const val NOTIFY_PENDING_INTENT_REQUEST_CODE = 0
    }

    // ui node list.
    private var textViewNodeList = ArrayList<AccessibilityNodeInfo>()
    private var editTextNodeList = ArrayList<AccessibilityNodeInfo>()

    // flag information required to display an overlay view on a specific screen.
    private var isFoundScreen = false
    private var hasKeyword = false

    private lateinit var windowManager: WindowManager

    // overlay views for display.
    private var overlayTitleButton: Button? = null
    private var screenTitleOverlayButton: Button? = null
    private var userInputOverlayButton: Button? = null
    private var guideToastOverlayButton: Button? = null
    private var offOverlayButton: Button? = null
    private var topLeftView: View? = null
    private var overlayParentView: LinearLayout? = null

    // variable related to overlay view touch events.
    private var offsetX = 0f
    private var offsetY = 0f
    private var originalXPos = 0
    private var originalYPos = 0
    private var isOverlayViewMoving = false

    // current settings page title.
    private var settingsScreenTitle: String? = null
    private var settingsInputEditText: String? = null

    private var debounceJob: Job? = null

    override fun onServiceConnected() {
        super.onServiceConnected()
        initialize()
    }

    private fun initialize() =
        (getSystemService(WINDOW_SERVICE) as WindowManager).also { windowManager = it }

    override fun onInterrupt() = Logger.i("onInterrupt:")

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // start the service as a foreground service
        // to keep the service running even when the app is closed
        startForeground(NOTIFICATION_ID, createNotification(this))

        return START_STICKY
    }

    override fun onDestroy() {
        releaseResources()
        super.onDestroy()
    }

    private fun releaseResources() {
        removeViews()
        cleanViews()
    }

    private fun removeViews() {
        overlayParentView?.let {
            it.visibility = View.GONE
            windowManager.removeView(it)
        }
        topLeftView?.let {
            it.visibility = View.GONE
            windowManager.removeView(it)
        }
    }

    private fun cleanViews() {
        overlayTitleButton = null
        screenTitleOverlayButton = null
        userInputOverlayButton = null
        guideToastOverlayButton = null
        offOverlayButton = null
        overlayParentView = null
        topLeftView = null
    }

    private fun isScreenWithOverlayView(nodeText: String): Boolean {
        Logger.i("screen title text: $nodeText")

        val screenTitle = nodeText.trim()
        val isScreenWithOverlayView: Boolean

        val isKrMobileNetworkTitle = ScreenTitle.KR_MOBILE_NETWORK.title == screenTitle
        val isKrRoamingAbroadTitle = ScreenTitle.KR_ROAMING_ABROAD.title == screenTitle
        val isEnRoamingAbroadTitle = ScreenTitle.EN_ROAMING_ABROAD.title == screenTitle
        val isKrTRoamingTitle = ScreenTitle.KR_T_ROAMING.title == screenTitle
        val isKrDisplayTitle = ScreenTitle.KR_DISPLAY.title == screenTitle
        val isKrNormalTitle = ScreenTitle.KR_NORMAL.title == screenTitle

        isScreenWithOverlayView =
            isKrRoamingAbroadTitle || isKrMobileNetworkTitle || isEnRoamingAbroadTitle || isKrTRoamingTitle || isKrDisplayTitle || isKrNormalTitle

        Logger.d("isScreenWithOverlayView: $isScreenWithOverlayView")
        return isScreenWithOverlayView
    }

    private fun isOnSettingsApp(className: String): Boolean {
        if ((!className.contains("settings") || !className.contains("Settings")) && className != "android.view.View") {
            return false
        }
        return true
    }

    private fun createNotification(context: Context): Notification {
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
        val notifyPendingIntent = PendingIntent.getActivity(
            context,
            NOTIFY_PENDING_INTENT_REQUEST_CODE,
            Intent(context, IntroActivity::class.java),
            PendingIntent.FLAG_IMMUTABLE
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

        /* Accessibility permission. */
        if (!PermissionUtils.checkAccessibilityPermission(context = this)) {
            DialogUtils.makeAlert(context = this)
                .setTitle(resources.getString(R.string.accessibility_popup_title))
                .setMessage(resources.getString(R.string.accessibility_popup_desc))
                .setNegativeButton(
                    resources.getString(R.string.accessibility_popup_btn_text)
                ) { _, _ -> PermissionUtils.moveToAccessibilitySettings(this) }.show()
            return
        }

        /* Overlay view on other apps permission. */
        if (!PermissionUtils.checkOverlayPermission(context = this)) {
            PermissionUtils.moveToOverlaySettings(context = this)
            return
        }

        val eventType: Int = accessibilityEvent.eventType
        val className = accessibilityEvent.className.toString()

        Logger.d("eventType: $eventType, className: $className")

        when (eventType) {
            AccessibilityEventType.INPUT_TEXT_CHANGED.eventType -> {
                // TODO:
            }

            AccessibilityEventType.WINDOW_STATE_CHANGED.eventType -> {
                // TODO:
                //if (!isOnSettingsApp(className = className)) {
                //releaseResources()
                //}
            }

            AccessibilityEventType.WINDOW_CONTENT_CHANGED.eventType -> {

                debounceJob?.cancel()
                debounceJob = CoroutineScope(Dispatchers.IO).launch {
                    delay(300)
                    withContext(Dispatchers.Main) { handleWindowContentChangedEvent() }
                }
            }

            else -> Logger.e("other events, eventType: $eventType")
        }
    }

    private fun handleWindowContentChangedEvent() {
        editTextNodeList.clear()

        loadChildViews(
            parentView = rootInActiveWindow,
            nodeList = editTextNodeList,
            compareViewStyle = ChildViewStyle.CHILD_EDIT_TEXT.viewStyle
        )

        for ((index, node) in editTextNodeList.withIndex()) {
            val nodeText = (node.text ?: "Not exist !!!").toString()
            if (index == 0) {
                settingsInputEditText = nodeText
            }
        }
        if (editTextNodeList.size <= 0) {
            settingsInputEditText = "Not exist !!!"
        }

        textViewNodeList.clear()

        loadChildViews(
            nodeList = textViewNodeList,
            parentView = rootInActiveWindow,
            compareViewStyle = ChildViewStyle.CHILD_TEXT_VIEW.viewStyle
        )
        hasKeyword = false

        for ((index, node) in textViewNodeList.withIndex()) {
            val nodeText = (node.text ?: "").toString()
            if (index == 0) {
                settingsScreenTitle = nodeText
                Logger.d("setting screen title: $settingsScreenTitle")
            }
            //if (!isScreenWithOverlayView(nodeText = nodeText)) continue
            if (index == 0) {
                hasKeyword = true
            }
        }
        isFoundScreen = hasKeyword

        if (!isFoundScreen) {
            releaseResources()
            showOverlayViews()
        } else {
            releaseResources()
            showOverlayViews()
        }
    }

    private fun showOverlayViews() {
        if (overlayParentView != null) {
            return
        }

        // title of overlay view itself.
        overlayTitleButton = Button(this)
        overlayTitleButton?.apply {
            setOnTouchListener(this@CustomAccessibilityService)
            setTypeface(this.typeface, Typeface.BOLD)
            text = resources.getString(R.string.overlay_view_title)
            textSize = 20f
            gravity = Gravity.CENTER
            setPadding(7, 7, 7, 7)
            setBackgroundColor(0x55ff5599)
            setTextColor(ContextCompat.getColor(this@CustomAccessibilityService, R.color.black))
        }

        // screen's title information.
        screenTitleOverlayButton = Button(this)
        screenTitleOverlayButton?.apply {
            id = Integer.parseInt(resources.getString(R.string.overlay_view_screen_title_view_id))
            setOnTouchListener(this@CustomAccessibilityService)
            setTypeface(this.typeface, Typeface.BOLD)
            text = String.format(
                resources.getString(R.string.overlay_view_screen_title), settingsScreenTitle
            )
            gravity = Gravity.CENTER
            setPadding(7, 7, 7, 7)
            setBackgroundColor(0x55ffff00)
            setTextColor(ContextCompat.getColor(this@CustomAccessibilityService, R.color.black))
        }

        // user input text.
        userInputOverlayButton = Button(this)
        userInputOverlayButton?.apply {
            id = Integer.parseInt(resources.getString(R.string.overlay_view_input_text_view_id))
            setOnTouchListener(this@CustomAccessibilityService)
            setTypeface(this.typeface, Typeface.BOLD)
            text = String.format(
                resources.getString(R.string.overlay_view_input_text), settingsInputEditText
            )
            gravity = Gravity.CENTER
            setPadding(7, 7, 7, 7)
            setBackgroundColor(0x55ff1133)
            setTextColor(ContextCompat.getColor(this@CustomAccessibilityService, R.color.black))
        }

        // guide overlay view which can show toast messages.
        guideToastOverlayButton = Button(this)
        guideToastOverlayButton?.apply {
            id =
                Integer.parseInt(resources.getString(R.string.overlay_view_show_guide_toast_view_id))
            setOnTouchListener(this@CustomAccessibilityService)
            setTypeface(this.typeface, Typeface.BOLD)
            text = resources.getString(R.string.overlay_view_show_guide_toast_msg)
            gravity = Gravity.CENTER
            setPadding(7, 7, 7, 7)
            setBackgroundColor(0x55ffffdd)
            setTextColor(ContextCompat.getColor(this@CustomAccessibilityService, R.color.black))
        }

        // overlay view off button.
        offOverlayButton = Button(this)
        offOverlayButton?.apply {
            id = Integer.parseInt(resources.getString(R.string.overlay_view_off_view_id))
            setOnTouchListener(this@CustomAccessibilityService)
            setTypeface(this.typeface, Typeface.BOLD)
            text = resources.getString(R.string.overlay_view_off_title)
            gravity = Gravity.CENTER
            setPadding(7, 7, 7, 7)
            setBackgroundColor(0x55dd99dd)
            setTextColor(ContextCompat.getColor(this@CustomAccessibilityService, R.color.black))
        }

        // parent view which includes title, screen's title, user input text and off button view.
        overlayParentView = LinearLayout(this)
        overlayParentView?.apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(0x55ffffee)
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT
            )
            setPadding(7, 7, 7, 7)
            gravity = Gravity.START or Gravity.CENTER_VERTICAL
            addView(overlayTitleButton)
            addView(screenTitleOverlayButton)
            addView(userInputOverlayButton)
            addView(guideToastOverlayButton)
            addView(offOverlayButton)
        }

        val parentViewParams = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY or WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH,
            PixelFormat.TRANSLUCENT
        )
        parentViewParams.gravity = Gravity.START or Gravity.CENTER_VERTICAL
        parentViewParams.x = 0
        parentViewParams.y = 0
        windowManager.addView(overlayParentView, parentViewParams)

        val topLeftParams = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY or WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH,
            PixelFormat.TRANSLUCENT
        )
        topLeftParams.gravity = Gravity.START or Gravity.CENTER_VERTICAL
        topLeftParams.x = 0
        topLeftParams.y = 0
        topLeftParams.width = 0
        topLeftParams.height = 0

        topLeftView = View(this)
        topLeftView?.apply {
            visibility = View.VISIBLE
        }
        windowManager.addView(topLeftView, topLeftParams)
    }

    private fun handleTouchActionDownEvent(event: MotionEvent) {
        val x = event.rawX
        val y = event.rawY
        isOverlayViewMoving = false
        val location = IntArray(2)
        overlayParentView!!.getLocationOnScreen(location)
        originalXPos = location[0]
        originalYPos = location[1]
        offsetX = originalXPos - x
        offsetY = originalYPos - y
    }

    override fun onTouch(v: View?, event: MotionEvent): Boolean {
        if (event.action == MotionEvent.ACTION_DOWN) {
            Logger.i("onTouch:")
            v?.let {
                when (it.id) {
                    100 -> {
                        Toast.makeText(
                            this, "User guideline.. step 1. step 2. step 3.", Toast.LENGTH_SHORT
                        ).show()
                        handleTouchActionDownEvent(event)
                    }

                    200 -> {
                        Toast.makeText(
                            this, "Disable overlay views", Toast.LENGTH_SHORT
                        ).show()
                        releaseResources()
                    }

                    300 -> {
                        Toast.makeText(
                            this, "Settings Screen Title: $settingsScreenTitle", Toast.LENGTH_SHORT
                        ).show()
                        handleTouchActionDownEvent(event)
                    }

                    400 -> {
                        Toast.makeText(
                            this, "Settings input text: $settingsInputEditText", Toast.LENGTH_SHORT
                        ).show()
                        handleTouchActionDownEvent(event)
                    }
                }
            }

        } else if (event.action == MotionEvent.ACTION_MOVE) {
            if (overlayParentView == null) {
                return false
            }
            val topLeftLocationOnScreen = IntArray(2)
            topLeftView!!.getLocationOnScreen(topLeftLocationOnScreen)
            val x = event.rawX
            val y = event.rawY
            val params: WindowManager.LayoutParams =
                overlayParentView!!.layoutParams as WindowManager.LayoutParams
            val newX = (offsetX + x).toInt()
            val newY = (offsetY + y).toInt()
            if (abs(newX - originalXPos) < 1 && abs(newY - originalYPos) < 1 && !isOverlayViewMoving) {
                return false
            }
            params.x = newX - topLeftLocationOnScreen[0]
            params.y = newY - topLeftLocationOnScreen[1]
            windowManager.updateViewLayout(overlayParentView, params)
            isOverlayViewMoving = true

        } else if (event.action == MotionEvent.ACTION_UP) {
            if (isOverlayViewMoving) {
                return true
            }
        }
        return false
    }

    override fun onClick(view: View?) {
        view?.let {
            when (it.id) {
                100 -> {
                    Toast.makeText(
                        this, "User guideline.. step 1. step 2. step 3.", Toast.LENGTH_SHORT
                    ).show()
                }

                200 -> {
                    Toast.makeText(
                        this, "Disable overlay views", Toast.LENGTH_SHORT
                    ).show()
                    releaseResources()
                }

                300 -> {
                    Toast.makeText(
                        this, "Settings Screen Title: $settingsScreenTitle", Toast.LENGTH_SHORT
                    ).show()
                }

                400 -> {
                    Toast.makeText(
                        this, "Settings input text: $settingsInputEditText", Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }
    }
}
