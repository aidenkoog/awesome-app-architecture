package io.github.aidenkoog.android.util

import android.content.Context
import android.graphics.PorterDuff
import android.graphics.Rect
import android.widget.TextView
import android.widget.Toast
import androidx.core.content.ContextCompat

fun Context.shortToast(message: String?) {
    Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
}

fun Context.longToast(message: String?) {
    Toast.makeText(this, message, Toast.LENGTH_LONG).show()
}

fun Context.coloredShortToast(
    message: String?, backgroundColor: Int, backgroundDrawable: Int, textColor: Int
) {
    showColoredToast(
        this, message, backgroundColor, backgroundDrawable, textColor, Toast.LENGTH_SHORT
    )
}

fun Context.coloredLongToast(
    message: String?, backgroundColor: Int, backgroundDrawable: Int, textColor: Int
) {
    showColoredToast(
        this, message, backgroundColor, backgroundDrawable, textColor, Toast.LENGTH_LONG
    )
}

@Suppress("DEPRECATION")
private fun showColoredToast(
    context: Context,
    message: String?,
    backgroundColor: Int,
    backgroundDrawable: Int,
    textColor: Int,
    length: Int
) {
    val toast = Toast.makeText(context, message, length)
    @Suppress("DEPRECATION") val view = toast.view!!

    val originalPaddingRect = Rect()
    view.background.getPadding(originalPaddingRect)
    view.background = ContextCompat.getDrawable(context, backgroundDrawable)
    view.setPadding(
        originalPaddingRect.left,
        originalPaddingRect.top,
        originalPaddingRect.right,
        originalPaddingRect.bottom
    )
    view.background.setColorFilter(
        ContextCompat.getColor(context, backgroundColor), PorterDuff.Mode.SRC
    )
    val textView = view.findViewById<TextView>(android.R.id.message)
    textView.setTextColor(ContextCompat.getColor(context, textColor))
    toast.show()
}