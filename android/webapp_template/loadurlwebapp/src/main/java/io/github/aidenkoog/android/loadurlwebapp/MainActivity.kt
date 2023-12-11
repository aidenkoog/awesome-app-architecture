package io.github.aidenkoog.android.loadurlwebapp

import android.app.Activity
import android.os.Bundle
import android.view.KeyEvent
import android.view.SurfaceView
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import android.widget.FrameLayout
import android.widget.LinearLayout

/*
 * template source code for web view.
 * on embedded environment, views are able to be modified.
 */
class MainActivity : Activity() {
    private lateinit var webView: WebView

    private lateinit var frameLayout: FrameLayout
    private lateinit var frameLayoutParams: FrameLayout.LayoutParams
    private lateinit var surfaceLayout: LinearLayout
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView = WebView(this)
        webView.clearCache(false)
        webView.loadUrl("http://www.google.com/")

        /*
         * the code below can be referred if developer is able to modify android views on AOSP source code.
         * customize surface layout.
         * frame layout (root layout) > web view, surface layout > surface view.
         */
        frameLayout = FrameLayout(this)
        frameLayout.id = FRAME_ID
        frameLayout.setBackgroundColor(0)

        surfaceLayout = LinearLayout(this)
        surfaceLayout.id = SURFACE_LAYOUT_ID
        frameLayoutParams = FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT
        )
        frameLayout.addView(surfaceLayout, frameLayoutParams)

        val surfaceView = SurfaceView(this)
        surfaceView.id = SURFACE_VIEW_ID
        surfaceLayout.addView(surfaceView)

        frameLayout.addView(webView, frameLayoutParams)
        webView.setBackgroundColor(0)
        setContentView(frameLayout)
    }

    override fun dispatchKeyEvent(event: KeyEvent): Boolean = webView.dispatchKeyEvent(event)

    override fun onUserLeaveHint() {
        val parent = webView.parent as ViewGroup
        parent.removeView(webView as View?)

        webView.destroy()
        finish()

        super.onUserLeaveHint()
    }

    override fun onPause() {
        if (surfaceLayout.visibility != View.GONE) {
            surfaceLayout.visibility = View.GONE
        }
        webView.onPause()
        super.onPause()
    }

    override fun onResume() {
        if (surfaceLayout.visibility != View.VISIBLE) {
            surfaceLayout.visibility = View.VISIBLE
        }
        webView.onResume()
        super.onResume()
    }

    companion object {
        private const val FRAME_ID = 0x0000fff
        private const val SURFACE_LAYOUT_ID = 0x0000ddd
        private const val SURFACE_VIEW_ID = 0x0000ccc
    }
}