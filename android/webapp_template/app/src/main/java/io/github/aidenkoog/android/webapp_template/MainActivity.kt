package io.github.aidenkoog.android.webapp_template

import android.os.Bundle
import android.util.Log
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import java.io.IOException


/*
 * template web view source code which loads html assets.
 */
class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView = WebView(this)
        webView.clearCache(false)

        val contentUrl = getInternalHtmlResource()
        contentUrl?.let {
            webView.loadUrl(it)
        }
        setContentView(webView)
    }

    private fun getInternalHtmlResource(): String? {
        val items: Array<String>?
        try {
            items = assets.list("html")
            items?.let {
                for (item in it) {
                    if (item == "index.html") {
                        return "file:///android_asset/html/index.html"
                    }
                }
            }
        } catch (e: IOException) {
            Log.e("debug", "there's no any asset file !!!")
            e.printStackTrace()
        }
        Log.d("debug", "cannot find index.html !!!")
        return null
    }

}