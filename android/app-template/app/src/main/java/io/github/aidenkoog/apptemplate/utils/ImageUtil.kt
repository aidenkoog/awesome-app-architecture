package io.github.aidenkoog.apptemplate.utils

import android.content.Context
import android.text.TextUtils
import android.util.TypedValue
import com.bumptech.glide.load.model.GlideUrl
import com.bumptech.glide.load.model.LazyHeaders

object ImageUtil {
    /*
     * get image url for loading it using Glide.
     */
    fun getGlideUrl(imageUrl: String?): GlideUrl? =
        if (TextUtils.isEmpty(getImageUrl(imageUrl))) null else GlideUrl(
            getImageUrl(imageUrl),
            LazyHeaders.Builder().addHeader("accept", "*/*")
                .addHeader("Content-Type", "application/json").build()
        )

    /*
     * prefix is going to be added if it doesn't exist in image url.
     */
    private fun getImageUrl(imageUrl: String?): String = if (StringUtil.isValidString(imageUrl)) {
        if (!imageUrl!!.startsWith("http")) {
            "https://$imageUrl"
        } else {
            imageUrl
        }
    } else ""

    @JvmStatic
    fun dpToPx(context: Context, dp: Int): Int {
        val metrics = context.resources.displayMetrics
        return TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp.toFloat(), metrics).toInt()
    }

    @JvmStatic
    fun dpToPx(context: Context, dp: Float): Int {
        val metrics = context.resources.displayMetrics
        return TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, metrics).toInt()
    }
}