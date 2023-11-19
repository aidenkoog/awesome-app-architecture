package io.github.aidenkoog.uiprototype.util.image

import android.text.TextUtils
import com.bumptech.glide.load.model.GlideUrl
import com.bumptech.glide.load.model.LazyHeaders

object ImageUtil {
    private const val IMAGE_DOWNLOAD_URL = ""

    fun getGlideUrlOfImage(imageUrl: String): GlideUrl? =
        if (TextUtils.isEmpty(getImageUrl(imageUrl))) null else GlideUrl(
            getImageUrl(imageUrl),
            LazyHeaders.Builder().addHeader("accept", "*/*")
                .addHeader("Content-Type", "application/...").build()
        )

    private fun getImageUrl(imageUrl: String): String =
        if (imageUrl.isNotEmpty() && imageUrl != "null" && imageUrl.trim { it <= ' ' } != "") {
            if (!imageUrl.startsWith("http")) {
                IMAGE_DOWNLOAD_URL + imageUrl
            } else {
                imageUrl
            }
        } else ""
}