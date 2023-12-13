package io.github.aidenkoog.apptemplate.presentation.base

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.os.Bundle
import android.os.IBinder
import android.view.MotionEvent
import android.view.inputmethod.InputMethodManager
import android.widget.EditText
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import io.github.aidenkoog.apptemplate.utils.NetworkStatus
import io.github.aidenkoog.apptemplate.utils.NetworkStatusHelper
import timber.log.Timber
import kotlin.math.abs

open class BaseActivity : AppCompatActivity() {

    private var startX = 0f
    private var startY = 0f

    private var networkStatusListener: OnNetworkStatusListener? = null

    interface OnNetworkStatusListener {
        fun onNetworkAvailable()
        fun onNetworkUnavailable()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        observeNetworkStatus()
    }

    private fun observeNetworkStatus() = NetworkStatusHelper(this).observe(this) {
        when (it) {
            NetworkStatus.Available -> networkStatusListener?.onNetworkAvailable()
            NetworkStatus.Unavailable -> networkStatusListener?.onNetworkUnavailable()
        }
    }

    /**
     * register this callback in where network status monitoring is needed.
     */
    open fun setOnNetworkStatusListener(listener: OnNetworkStatusListener) {
        networkStatusListener = listener
    }

    /**
     * register the callback related to back button press.
     * this method can be used
     * when it's necessary to execute the custom code after detecting back press event.
     */
    open fun registerBackPressedCallback() {
        val mBackPressedCallback: OnBackPressedCallback = object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                onHandleBackPressed() // custom code
            }
        }
        runCatching {
            onBackPressedDispatcher.addCallback(this, mBackPressedCallback)
        }.onFailure { e ->
            e.printStackTrace()
        }
    }

    /**
     * this method will be defined again in the concrete class extending this.
     * developer can put the custom logic here.
     */
    open fun onHandleBackPressed() {}

    /**
     * simply execute onBackPressed instead of using the deprecated onBackPressed method.
     * developer can use this if it's not necessary to put the custom code.
     */
    open fun backPressedWithDispatcher() {
        runCatching {
            onBackPressedDispatcher.onBackPressed()

        }.onFailure { e -> e.printStackTrace() }
    }

    override fun onStart() {
        Timber.d("onStart: ")
        super.onStart()
    }

    @SuppressLint("BinaryOperationInTimber")
    override fun onDestroy() {
        // clear resources.
        super.onDestroy()
    }

    /**
     * dispatch to hide keypad when outside area is touched.
     */
    override fun dispatchTouchEvent(ev: MotionEvent): Boolean {
        when (ev.action) {
            MotionEvent.ACTION_DOWN -> {
                startX = ev.x
                startY = ev.y
            }

            MotionEvent.ACTION_MOVE -> {}
            MotionEvent.ACTION_UP -> {
                val endX = ev.x
                val endY = ev.y
                if (isClick(startX, endX, startY, endY)) {
                    val view = currentFocus
                    if (view is EditText) {
                        if (isWithinEditTextBounds(view, ev.rawY.toInt())) {
                            return super.dispatchTouchEvent(ev)
                        }
                        hideSoftInputWindow(this)
                    }
                }
                startX = 0f
                startY = 0f
            }

            else -> return super.dispatchTouchEvent(ev)
        }
        return super.dispatchTouchEvent(ev)
    }

    private fun isClick(startX: Float, endX: Float, startY: Float, endY: Float): Boolean {
        val differenceX = abs(startX - endX)
        val differenceY = abs(startY - endY)
        return (differenceX <= 50 && differenceY <= 50)
    }

    private fun hideSoftInputWindow(context: Context) {
        val inputMethodManager =
            context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager

        val binder = getBinder(context) ?: return
        inputMethodManager.hideSoftInputFromWindow(binder, 0)
    }

    private fun getBinder(context: Context): IBinder? {
        if (context !is Activity) return null
        if (isFinishing || isDestroyed) return null
        val view = context.currentFocus ?: return null

        return view.windowToken ?: return null
    }

    /**
     * dispatch to edit text view.
     */
    private fun isWithinEditTextBounds(edit: EditText, yPoint: Int): Boolean {
        val outLocations = IntArray(2)
        edit.getLocationOnScreen(outLocations)
        val y = outLocations[1]
        val h = edit.height
        return yPoint >= y && yPoint <= y + h
    }

    override fun onResume() {
        Timber.d("onResume: ")
        super.onResume()
    }

    public override fun onPause() {
        super.onPause()
    }

    open fun showToast(message: String?, duration: Int = Toast.LENGTH_SHORT) {
        if (isFinishing || isDestroyed) return
        Toast.makeText(this, message ?: "no messages", duration).show()
    }
}