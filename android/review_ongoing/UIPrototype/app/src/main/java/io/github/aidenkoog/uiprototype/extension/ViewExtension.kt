package io.github.aidenkoog.uiprototype.extension

import android.view.View

/**
 * Custom click listener for consequence click events.
 */
fun View.setOnSingleClickListener(onSingleClick: (View) -> Unit) =
    setOnClickListener(OnSingleClickListener { onSingleClick(it) })

class OnSingleClickListener(private val onSingleClick: (View) -> Unit) : View.OnClickListener {
    companion object {
        private const val CLICK_INTERVAL = 300
    }

    private var lastClickedTime: Long = 0L

    override fun onClick(v: View?) {
        if (isSafe() && v != null) {
            lastClickedTime = System.currentTimeMillis()
            onSingleClick(v)
        }
    }

    private fun isSafe(): Boolean = System.currentTimeMillis() - lastClickedTime > CLICK_INTERVAL
}