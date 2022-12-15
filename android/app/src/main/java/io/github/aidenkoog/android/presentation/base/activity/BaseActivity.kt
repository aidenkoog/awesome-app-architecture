package io.github.aidenkoog.android.presentation.base.activity

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.Build
import android.os.Bundle
import android.view.MotionEvent
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.webkit.CookieManager
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.snackbar.Snackbar
import com.orhanobut.logger.Logger
import io.github.aidenkoog.android.util.NetworkStatus
import io.github.aidenkoog.android.util.NetworkStatusHelper
import java.lang.Exception

open class BaseActivity : AppCompatActivity() {

    private var networkStatusListener: OnNetworkStatusListener? = null

    interface OnNetworkStatusListener {
        fun onNetworkAvailable()
        fun onNetworkUnavailable()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        NetworkStatusHelper(this).observe(this) {
            when (it) {
                NetworkStatus.Available -> {
                    Logger.d("Network Connection Established")
                    networkStatusListener?.onNetworkAvailable()
                }
                NetworkStatus.Unavailable -> {
                    Logger.e("No Internet !!!")
                    networkStatusListener?.onNetworkUnavailable()
                }
            }
        }
        super.onCreate(savedInstanceState)
    }

    open fun setOnNetworkStatusListener(listener: OnNetworkStatusListener) {
        networkStatusListener = listener
    }

    @SuppressLint("ObsoleteSdkInt")
    open fun isNetworkConnected(): Boolean {

        // register activity with the connectivity manager service
        val connectivityManager =
            getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

        // if the android version is equal to M
        // or greater we need to use the
        // NetworkCapabilities to check what type of
        // network has the internet connection
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {

            // Returns a Network object corresponding to
            // the currently active default data network.
            val network = connectivityManager.activeNetwork ?: return false

            // Representation of the capabilities of an active network.
            val activeNetwork = connectivityManager.getNetworkCapabilities(network) ?: return false

            return when {
                // Indicates this network uses a Wi-Fi transport,
                // or WiFi has network connectivity
                activeNetwork.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> true

                // Indicates this network uses a Cellular transport. or
                // Cellular has network connectivity
                activeNetwork.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> true

                // else return false
                else -> false
            }
        } else {
            // if the android version is below M
            @Suppress("DEPRECATION") val networkInfo =
                connectivityManager.activeNetworkInfo ?: return false
            @Suppress("DEPRECATION")
            return networkInfo.isConnected
        }
    }

    override fun finish() {
        super.finish()
        overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out)
    }

    fun callActivity(intent: Intent, isFinish: Boolean) {
        intent.flags = Intent.FLAG_ACTIVITY_NO_ANIMATION
        startActivity(intent)
        overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out)
        if (isFinish) {
            finish()
        }
    }

    override fun dispatchTouchEvent(ev: MotionEvent?): Boolean {
        val view = currentFocus ?: return super.dispatchTouchEvent(ev)
        if (ev == null) {
            return super.dispatchTouchEvent(ev)
        }
        if ((ev.action == MotionEvent.ACTION_UP
                    || ev.action == MotionEvent.ACTION_MOVE)
            && view is EditText && !view.javaClass.name.startsWith("android.webkit.")
        ) {
            val outLocation = IntArray(2)
            view.getLocationOnScreen(outLocation)
            val x = ev.rawX + view.getLeft() - outLocation[0]
            val y = ev.rawY + view.getTop() - outLocation[1]
            if (x < view.getLeft() || x > view.getRight()
                || y < view.getTop() || y > view.getBottom()
            ) {
                (this.getSystemService(
                    Context.INPUT_METHOD_SERVICE
                ) as InputMethodManager).hideSoftInputFromWindow(
                    this.window.decorView.applicationWindowToken, 0
                )
            }
        }
        return super.dispatchTouchEvent(ev)
    }

    open fun clearCookies() {
        val cookieManager = CookieManager.getInstance()
        cookieManager.removeSessionCookies {
            Logger.d("cookie session init")
        }
    }

    open fun showSnackBar(msg: String?) {
        try {
            if (isFinishing || isDestroyed) {
                Logger.e("activity is now being finished or already destroyed !!!")
                return
            }
            val snackBar =
                Snackbar.make(findViewById(android.R.id.content), msg!!, Snackbar.LENGTH_SHORT)
                    .setDuration(Snackbar.LENGTH_SHORT)
            val snackBarView: View = snackBar.view
            val tv =
                snackBarView.findViewById(com.google.android.material.R.id.snackbar_text) as TextView
            tv.maxLines = 3
            snackBar.show()

        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}