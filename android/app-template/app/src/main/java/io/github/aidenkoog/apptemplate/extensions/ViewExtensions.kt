package io.github.aidenkoog.apptemplate.extensions

import android.view.View
import timber.log.Timber

class OnSingleClickListener(private val onSingleClick: (View) -> Unit) : View.OnClickListener {
    companion object {
        private const val CLICK_INTERVAL = 300
    }

    private var lastClickedTime: Long = 0L

    override fun onClick(v: View?) = if (isSafe() && v != null) {
        lastClickedTime = System.currentTimeMillis()
        onSingleClick(v)
    } else {
        Timber.e("click event cannot be executed because it's not safe now or view is null !!!")
    }

    private fun isSafe(): Boolean = System.currentTimeMillis() - lastClickedTime > CLICK_INTERVAL
}

fun View.setOnSingleClickListener(onSingleClick: (View) -> Unit) =
    setOnClickListener(OnSingleClickListener { onSingleClick(it) })