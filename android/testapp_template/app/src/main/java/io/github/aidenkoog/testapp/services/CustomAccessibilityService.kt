package io.github.aidenkoog.testapp.services

import android.accessibilityservice.AccessibilityService
import android.annotation.SuppressLint
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.view.Gravity
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup.LayoutParams
import android.view.WindowManager
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import android.widget.Button
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.Toast
import androidx.core.app.NotificationCompat
import com.airbnb.lottie.LottieAnimationView
import com.airbnb.lottie.LottieDrawable
import com.orhanobut.logger.Logger
import io.github.aidenkoog.testapp.R
import io.github.aidenkoog.testapp.presentation.intro.IntroActivity
import io.github.aidenkoog.testapp.services.child_style.ChildViewStyle
import io.github.aidenkoog.testapp.services.event_type.AccessibilityEventType
import io.github.aidenkoog.testapp.services.screen_comparison.ScreenTitle
import io.github.aidenkoog.testapp.utils.LottieUtil
import io.github.aidenkoog.testapp.utils.PermissionUtils.checkAccessibilityPermission
import io.github.aidenkoog.testapp.utils.PermissionUtils.checkOverlayPermission
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

/*
 * refs | notice.
 * developers do not need to start this service directly.
 * the Android framework looks for custom accessibility services implemented by developer,
 * and launches them when accessibility permissions are enabled.
 * the order of analyzing the source code.
 * flow: onServiceConnected --> onAccessibilityEvent --> onWindowContentChanged
 */
class CustomAccessibilityService : AccessibilityService(), View.OnTouchListener {

    private lateinit var windowManager: WindowManager

    // ui node list.
    private var textViewNodeList = ArrayList<AccessibilityNodeInfo>()
    private var editTextNodeList = ArrayList<AccessibilityNodeInfo>()

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
    private var toastDebounceJob: Job? = null

    // overlay views for display.
    private var lottieView: LottieAnimationView? = null

    private var overlayTitleButton: Button? = null
    private var screenTitleOverlayButton: Button? = null
    private var userInputOverlayButton: Button? = null
    private var guideToastOverlayButton: Button? = null
    private var offOverlayButton: Button? = null

    private var topLeftView: View? = null
    private var overlayParentView: LinearLayout? = null

    private var legacyOverlayOnOffButton: Button? = null
    private var legacyOverlayView: View? = null

    // this method is invoked only one time when accessibility service is activated.
    override fun onServiceConnected() {
        super.onServiceConnected()
        (getSystemService(WINDOW_SERVICE) as WindowManager).also { windowManager = it }
    }

    // this method is for handling exceptions.
    override fun onInterrupt() = Logger.i("onInterrupt:")

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // start the service as a foreground service
        // to keep the service running even when the app is closed.
        startForeground(NOTIFICATION_ID, createNotification(this))

        return START_STICKY
    }

    // release all resources related to the overlay view right
    // before the accessibility service is destroyed.
    override fun onDestroy() {
        releaseResources()
        super.onDestroy()
    }

    // remove the view from the window manager and initializes view-related variables to null.
    private fun releaseResources() {
        removeViews()
        cleanViews()
    }

    // all accessibility-related event information,
    // that is, AccessibilityEvent object comes into this method.
    override fun onAccessibilityEvent(accessibilityEvent: AccessibilityEvent) {

        // accessibility and overlay view on other apps permission.
        // show warning toast message after checking permissions
        // whenever accessibility events come in here.
        if (!checkAccessibilityPermission(context = this) || !checkOverlayPermission(context = this)) {
            toastDebounceJob?.cancel()
            toastDebounceJob = CoroutineScope(Dispatchers.IO).launch {
                delay(TOAST_DEBOUNCE_DELAY)
                withContext(Dispatchers.Main) {
                    makeToast(
                        context = this@CustomAccessibilityService,
                        resources.getString(R.string.toast_warning_overlay),
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
            return
        }

        // eventType: ex. integer value, TYPE_WINDOW_STATE_CHANGED (32 <--) etc.
        // className: ex. android.view.View, com.android.CustomSettings etc.
        val eventType: Int = accessibilityEvent.eventType
        val className = accessibilityEvent.className.toString()

        Logger.d("eventType: $eventType, className: $className")

        when (eventType) {

            // change of window itself.
            AccessibilityEventType.WINDOW_STATE_CHANGED.eventType -> {
                Logger.i("isOnSettingsApp: ${isOnSettingsApp(className = className)}")
            }

            // change of content in window, text input, popup, layout change etc.
            AccessibilityEventType.WINDOW_CONTENT_CHANGED.eventType -> {
                eventDebounceJob?.cancel()
                eventDebounceJob = CoroutineScope(Dispatchers.IO).launch {
                    delay(EVENT_DEBOUNCE_DELAY)
                    withContext(Dispatchers.Main) { onWindowContentChanged() }
                }
            }

            // other accessibility events.
            else -> Logger.i("other events come in")
        }
    }

    // the previously displayed overlay view is removed and,
    // if the current screen is a screen that can have an overlay view,
    // the overlay view is displayed when a change in window content is detected.
    private fun onWindowContentChanged() {
        loadFirstInputText()
        releaseResources()
        if (hasScreenKeyword()) {
            showOverlayViews()
        }
    }

    // gather text view node list, check if current screen is able to have overlay view
    // and return the result, true or false.
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
                settingsScreenTitle = nodeText  // save current screen title.
                if (isScreenWithOverlayView(nodeText = nodeText)) {
                    hasKeyword = true
                }
            }
        }
        return hasKeyword
    }

    // the contents written in the first input window are saved
    // after getting the node list of the user input window.
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
                settingsInputEditText = nodeText    // save first input text.
            }
        }
        if (editTextNodeList.size <= 0) {
            settingsInputEditText = resources.getString(R.string.overlay_view_no_input_text_msg)
        }
    }

    // check if current screen can have overlay view.
    private fun isScreenWithOverlayView(nodeText: String): Boolean {
        Logger.i("screen title text: $nodeText")

        val currentTitle = nodeText.trim()
        val canShowOverlayView: Boolean = hasValidTitle(currentTitle)

        Logger.d("isScreenWithOverlayView: $canShowOverlayView")
        return canShowOverlayView
    }

    // check if the title information of the current screen is within the ScreenTitle enum.
    // return true if there's current title in ScreenTitle.
    private fun hasValidTitle(currentTitle: String): Boolean {
        for (screenTitle in ScreenTitle.values()) {
            val title = screenTitle.title
            if (title == currentTitle || currentTitle.contains(title)) {
                return true
            }
        }
        return false
    }

    // check if current screen is android settings app.
    private fun isOnSettingsApp(className: String): Boolean =
        !(!className.contains("settings") && !className.contains("Settings"))

    private fun showOverlayViews() {
        if (overlayParentView != null) {
            return
        }
        makeOverlayViews()
        windowManager.addView(overlayParentView, getParentLayoutParams(getDefaultLayoutParams()))
        windowManager.addView(topLeftView, getTopLeftLayoutParams(getDefaultLayoutParams()))
    }

    // This method is for checking legacy code implemented in the xml inflate method.
    @SuppressLint("InflateParams")
    private fun addLegacyView() {
        val inflate = getSystemService(LAYOUT_INFLATER_SERVICE) as LayoutInflater
        legacyOverlayView = inflate.inflate(R.layout.overlay_layout, null)

        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager

        val params = getDefaultLayoutParams()
        params.gravity = Gravity.CENTER_HORIZONTAL
        params.y = 400
        windowManager.addView(legacyOverlayView, params)
    }

    // remove views from window manager.
    private fun removeViews() {
        overlayParentView?.let {
            windowManager.removeView(it)
        }
        topLeftView?.let {
            windowManager.removeView(it)
        }
        legacyOverlayView?.let {
            windowManager.removeView(it)
        }
    }

    // clean view variable.
    private fun cleanViews() {
        overlayTitleButton = null
        screenTitleOverlayButton = null
        userInputOverlayButton = null
        guideToastOverlayButton = null
        offOverlayButton = null
        overlayParentView = null
        topLeftView = null
        legacyOverlayView = null
    }

    // create notification channel for foreground service.
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

    // initialize resources related to notification.
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

    // create an overlay view to attach to the window.
    // dynamically generated based on Kotlin code, not XML based.
    // It consists of lottie view and buttons for animation or other tests.
    private fun makeOverlayViews() {
        lottieView = LottieAnimationView(this)
        lottieView?.let {
            it.layoutParams = LayoutParams(450, 150)
            it.id = OVERLAY_LOTTIE
            it.setOnTouchListener(this@CustomAccessibilityService)
            LottieUtil.setScaleType(it, ImageView.ScaleType.CENTER_CROP)
            LottieUtil.setLottieRawResource(it, R.raw.progress_lottie)
            LottieUtil.setLottieRepeatCount(it, LottieDrawable.INFINITE)
            LottieUtil.playLottie(it)
        }

        overlayTitleButton = makeOverlayViewItem(
            context = this,
            itemId = Integer.parseInt(resources.getString(R.string.overlay_view_default_id)),
            touchListener = this@CustomAccessibilityService,
            itemText = resources.getString(R.string.overlay_view_title),
            itemTextSize = 16f,
            itemBgColor = 0x55ff5599
        )

        screenTitleOverlayButton = makeOverlayViewItem(
            context = this,
            itemId = Integer.parseInt(resources.getString(R.string.overlay_view_screen_title_view_id)),
            touchListener = this@CustomAccessibilityService,
            itemText = String.format(
                resources.getString(R.string.overlay_view_screen_title), settingsScreenTitle
            ),
            itemTextSize = 13f,
            itemBgColor = 0x55ffff00
        )

        userInputOverlayButton = makeOverlayViewItem(
            context = this,
            itemId = Integer.parseInt(resources.getString(R.string.overlay_view_input_text_view_id)),
            touchListener = this@CustomAccessibilityService,
            itemText = String.format(
                resources.getString(R.string.overlay_view_input_text), settingsInputEditText
            ),
            itemTextSize = 13f,
            itemBgColor = 0x55ff1133
        )

        guideToastOverlayButton = makeOverlayViewItem(
            context = this,
            itemId = Integer.parseInt(resources.getString(R.string.overlay_view_show_guide_toast_view_id)),
            touchListener = this@CustomAccessibilityService,
            itemText = resources.getString(R.string.overlay_view_show_guide_toast_msg),
            itemTextSize = 13f,
            itemBgColor = 0x55ffffdd
        )

        legacyOverlayOnOffButton = makeOverlayViewItem(
            context = this,
            itemId = OVERLAY_LEGACY_VIEW_ON,
            touchListener = this@CustomAccessibilityService,
            itemText = resources.getString(R.string.overlay_view_legacy_on_msg),
            itemTextSize = 13f,
            itemBgColor = 0x55aa88dd
        )

        offOverlayButton = makeOverlayViewItem(
            context = this,
            itemId = Integer.parseInt(resources.getString(R.string.overlay_view_off_view_id)),
            touchListener = this@CustomAccessibilityService,
            itemText = resources.getString(R.string.overlay_view_off_title),
            itemTextSize = 13f,
            itemBgColor = 0x55dd99dd
        )

        // parent overlay view.
        // attach all the child views defined above to the parent view.
        overlayParentView = makeOverlayViewParent(
            context = this, items = arrayOf(
                lottieView ?: LottieAnimationView(this),
                overlayTitleButton ?: Button(this),
                screenTitleOverlayButton ?: Button(this),
                userInputOverlayButton ?: Button(this),
                guideToastOverlayButton ?: Button(this),
                legacyOverlayOnOffButton ?: Button(this),
                offOverlayButton ?: Button(this)
            )
        )
        topLeftView = View(this)
    }

    /*----------------------------------------------------------------------------------------------
     * The codes below are for handling touch events on the view. (View.OnTouchListener)
     * refs.
     * There is code that can display a toast when touch down event occurs,
     * close the view, or move the view.
     *---------------------------------------------------------------------------------------------*/
    private fun preconditionForActionDown(view: View?, event: MotionEvent) {
        if (view == null) return
        when (view.id) {
            OVERLAY_GUIDE_TOAST -> {
                makeToast(this, "User guideline.", Toast.LENGTH_SHORT).show()
                handleTouchActionEvent(event)
            }

            OVERLAY_OFF -> {
                makeToast(this, "Disable overlay views.", Toast.LENGTH_SHORT).show()
                releaseResources()
            }

            OVERLAY_SCREEN_TITLE -> {
                makeToast(this, "Screen: $settingsScreenTitle", Toast.LENGTH_SHORT).show()
                handleTouchActionEvent(event)
            }

            OVERLAY_INPUT_TEXT -> {
                makeToast(this, "Input: $settingsInputEditText", Toast.LENGTH_SHORT).show()
                handleTouchActionEvent(event)
            }

            OVERLAY_LOTTIE -> {
                makeToast(this, "Lottie Animation", Toast.LENGTH_SHORT).show()
                handleTouchActionEvent(event)
            }

            OVERLAY_LEGACY_VIEW_ON -> {
                makeToast(this, "Show legacy overlay view.", Toast.LENGTH_SHORT).show()
                addLegacyView()
                handleTouchActionEvent(event)
            }

            else -> {
                makeToast(this, "Other areas Touched !", Toast.LENGTH_SHORT).show()
                handleTouchActionEvent(event)
            }
        }
    }

    private fun handleTouchActionEvent(event: MotionEvent) {
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
            preconditionForActionDown(view, event)

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

    companion object {
        // notification related constants.
        const val NOTIFICATION_ID = 1000
        const val NOTIFY_PENDING_INTENT_REQUEST_CODE = 0

        // debounce delay for handling accessibility events and showing toast ui.
        const val EVENT_DEBOUNCE_DELAY = 300L
        const val TOAST_DEBOUNCE_DELAY = 300L

        // overlay view item id.
        const val OVERLAY_GUIDE_TOAST = 100
        const val OVERLAY_OFF = 200
        const val OVERLAY_SCREEN_TITLE = 300
        const val OVERLAY_INPUT_TEXT = 400
        const val OVERLAY_LOTTIE = 500
        const val OVERLAY_LEGACY_VIEW_ON = 600
    }
}
