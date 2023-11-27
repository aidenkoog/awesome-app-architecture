package io.github.aidenkoog.apptemplate.utils

import android.view.View

object ViewUtils {

    inline fun View.click(crossinline block: (View) -> Unit) {
        setOnClickListener { view ->
            block(view)
        }
    }
}