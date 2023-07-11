package io.github.aidenkoog.testapp.services

import android.accessibilityservice.AccessibilityService
import android.annotation.SuppressLint
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import android.widget.Button
import android.widget.LinearLayout
import android.widget.Toast
import androidx.core.app.NotificationCompat
import com.orhanobut.logger.Logger
import io.github.aidenkoog.testapp.R
import io.github.aidenkoog.testapp.presentation.intro.IntroActivity
import io.github.aidenkoog.testapp.services.child_style.ChildViewStyle
import io.github.aidenkoog.testapp.services.event_type.AccessibilityEventType
import io.github.aidenkoog.testapp.services.screen_comparison.ScreenTitle
import io.github.aidenkoog.testapp.utils.PermissionUtils.checkAccessibilityPermission
import io.github.aidenkoog.testapp.utils.PermissionUtils.checkOverlayPermission
import io.github.aidenkoog.testapp.utils.PermissionUtils.moveToAccessibilitySettings
import io.github.aidenkoog.testapp.utils.PermissionUtils.moveToOverlaySettings
import io.github.aidenkoog.testapp.utils.ToastUtils.makeToast
import io.github.aidenkoog.testapp.utils.ViewNodeUtils.getDefaultLayoutParams
import io.github.aidenkoog.testapp.utils.ViewNodeUtils.getParentLayoutParams
import io.github.aidenkoog.testapp.utils.ViewNodeUtils.getTopLeftLayoutParams
import io.github.aidenkoog.testapp.utils.ViewNodeUtils.loadChildViews
import io.github.aidenkoog.testapp.utils.ViewNodeUtils.makeOverlayViewItem
import io.github.aidenkoog.testapp.utils.ViewNodeUtils.makeOverlayViewParent
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import kotlin.math.abs


class CustomAccessibilityService : AccessibilityService(), View.OnTouchListener {

    companion object {
        const val NOTIFICATION_ID = 1000
        const val NOTIFY_PENDING_INTENT_REQUEST_CODE = 0
        const val EVENT_DEBOUNCE_DELAY = 500L

        // overlay view item id.
        const val OVERLAY_GUIDE_TOAST = 100
        const val OVERLAY_OFF = 200
        const val OVERLAY_SCREEN_TITLE = 300
        const val OVERLAY_INPUT_TEXT = 400
    }

    private lateinit var windowManager: WindowManager

    // ui node list.
    private var textViewNodeList = ArrayList<AccessibilityNodeInfo>()
    private var editTextNodeList = ArrayList<AccessibilityNodeInfo>()

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

    // current saved screen title and user input text.
    private var settingsScreenTitle: String? = null
    private var settingsInputEditText: String? = null

    // debounce job for handling continuous incoming events within a short period of time
    private var eventDebounceJob: Job? = null

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
        val isKrSearchTitle = ScreenTitle.KR_SEARCH.title == screenTitle

        isScreenWithOverlayView =
            isKrRoamingAbroadTitle || isKrMobileNetworkTitle || isEnRoamingAbroadTitle
                    || isKrTRoamingTitle || isKrSearchTitle

        Logger.d("isScreenWithOverlayView: $isScreenWithOverlayView")
        return isScreenWithOverlayView
    }

    private fun isOnSettingsApp(className: String): Boolean =
        !(!className.contains("settings") && !className.contains("Settings"))

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
        if (!checkAccessibilityPermission(context = this)) {
            showPermissionWarningToast()
            moveToAccessibilitySettings(context = this)
            return
        }

        /* Overlay view on other apps permission. */
        if (!checkOverlayPermission(context = this)) {
            showPermissionWarningToast()
            moveToOverlaySettings(context = this)
            return
        }

        val eventType: Int = accessibilityEvent.eventType
        val className = accessibilityEvent.className.toString()

        Logger.d("eventType: $eventType, className: $className")

        /* Accessibility events. */
        when (eventType) {
            AccessibilityEventType.WINDOW_STATE_CHANGED.eventType -> {
                Logger.i("isOnSettingsApp: ${isOnSettingsApp(className = className)}")
            }

            AccessibilityEventType.WINDOW_CONTENT_CHANGED.eventType -> {
                eventDebounceJob?.cancel()
                eventDebounceJob = CoroutineScope(Dispatchers.IO).launch {
                    delay(EVENT_DEBOUNCE_DELAY)
                    withContext(Dispatchers.Main) { onWindowContentChanged() }
                }
            }

            else -> Logger.i("other events come in")
        }
    }

    private fun showPermissionWarningToast() = makeToast(
        context = this,
        resources.getString(R.string.toast_warning_overlay),
        Toast.LENGTH_SHORT
    ).show()

    private fun onWindowContentChanged() {
        loadFirstInputText()
        releaseResources()
        if (hasScreenKeyword()) {
            showOverlayViews()
        }
    }

    private fun hasScreenKeyword(): Boolean {
        textViewNodeList.clear()
        loadChildViews(
            nodeList = textViewNodeList,
            parentView = rootInActiveWindow,
            compareViewStyle = ChildViewStyle.CHILD_TEXT_VIEW.viewStyle
        )

        var hasKeyword = false
        for ((index, node) in textViewNodeList.withIndex()) {
            val nodeText = (node.text
                ?: resources.getString(R.string.overlay_view_no_screen_title_msg)).toString()
            if (index == 0) {
                settingsScreenTitle = nodeText
                if (isScreenWithOverlayView(nodeText = nodeText)) {
                    hasKeyword = true
                }
            }
        }
        return hasKeyword
    }

    private fun loadFirstInputText() {
        editTextNodeList.clear()
        loadChildViews(
            parentView = rootInActiveWindow,
            nodeList = editTextNodeList,
            compareViewStyle = ChildViewStyle.CHILD_EDIT_TEXT.viewStyle
        )
        for ((index, node) in editTextNodeList.withIndex()) {
            val nodeText = (node.text
                ?: resources.getString(R.string.overlay_view_no_input_text_msg)).toString()
            if (index == 0) {
                settingsInputEditText = nodeText
            }
        }
        if (editTextNodeList.size <= 0) {
            settingsInputEditText = resources.getString(R.string.overlay_view_no_input_text_msg)
        }
    }


    private fun showOverlayViews() {
        if (overlayParentView != null) {
            return
        }
        makeOverlayViews()
        windowManager.addView(overlayParentView, getParentLayoutParams(getDefaultLayoutParams()))
        windowManager.addView(topLeftView, getTopLeftLayoutParams(getDefaultLayoutParams()))
    }

    private fun makeOverlayViews() {
        overlayTitleButton = makeOverlayViewItem(
            context = this,
            itemId = Integer.parseInt(resources.getString(R.string.overlay_view_default_id)),
            touchListener = this@CustomAccessibilityService,
            itemText = resources.getString(R.string.overlay_view_title),
            itemTextSize = 20f,
            itemBgColor = 0x55ff5599
        )

        screenTitleOverlayButton = makeOverlayViewItem(
            context = this,
            itemId = Integer.parseInt(resources.getString(R.string.overlay_view_screen_title_view_id)),
            touchListener = this@CustomAccessibilityService,
            itemText = String.format(
                resources.getString(R.string.overlay_view_screen_title), settingsScreenTitle
            ),
            itemTextSize = 15f,
            itemBgColor = 0x55ffff00
        )

        userInputOverlayButton = makeOverlayViewItem(
            context = this,
            itemId = Integer.parseInt(resources.getString(R.string.overlay_view_input_text_view_id)),
            touchListener = this@CustomAccessibilityService,
            itemText = String.format(
                resources.getString(R.string.overlay_view_input_text), settingsInputEditText
            ),
            itemTextSize = 15f,
            itemBgColor = 0x55ff1133
        )

        guideToastOverlayButton = makeOverlayViewItem(
            context = this,
            itemId = Integer.parseInt(resources.getString(R.string.overlay_view_show_guide_toast_view_id)),
            touchListener = this@CustomAccessibilityService,
            itemText = resources.getString(R.string.overlay_view_show_guide_toast_msg),
            itemTextSize = 15f,
            itemBgColor = 0x55ffffdd
        )

        offOverlayButton = makeOverlayViewItem(
            context = this,
            itemId = Integer.parseInt(resources.getString(R.string.overlay_view_off_view_id)),
            touchListener = this@CustomAccessibilityService,
            itemText = resources.getString(R.string.overlay_view_off_title),
            itemTextSize = 15f,
            itemBgColor = 0x55dd99dd
        )

        overlayParentView = makeOverlayViewParent(
            context = this, items = arrayOf(
                overlayTitleButton ?: Button(this),
                screenTitleOverlayButton ?: Button(this),
                userInputOverlayButton ?: Button(this),
                guideToastOverlayButton ?: Button(this),
                offOverlayButton ?: Button(this)
            )
        )
        topLeftView = View(this)
    }

    private fun onTouchActionDownEvent(event: MotionEvent) {
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

    @SuppressLint("ClickableViewAccessibility")
    override fun onTouch(view: View?, event: MotionEvent): Boolean {
        if (event.action == MotionEvent.ACTION_DOWN) {
            Logger.i("onTouch:")
            view?.let {
                when (it.id) {
                    OVERLAY_GUIDE_TOAST -> {
                        makeToast(this, "User guideline.", Toast.LENGTH_SHORT).show()
                        onTouchActionDownEvent(event)
                    }

                    OVERLAY_OFF -> {
                        makeToast(this, "Disable overlay views.", Toast.LENGTH_SHORT).show()
                        releaseResources()
                    }

                    OVERLAY_SCREEN_TITLE -> {
                        makeToast(this, "Screen: $settingsScreenTitle", Toast.LENGTH_SHORT).show()
                        onTouchActionDownEvent(event)
                    }

                    OVERLAY_INPUT_TEXT -> {
                        makeToast(this, "Input: $settingsInputEditText", Toast.LENGTH_SHORT).show()
                        onTouchActionDownEvent(event)
                    }

                    else -> {
                        makeToast(this, "Other areas Touched !", Toast.LENGTH_SHORT).show()
                        onTouchActionDownEvent(event)
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
}
