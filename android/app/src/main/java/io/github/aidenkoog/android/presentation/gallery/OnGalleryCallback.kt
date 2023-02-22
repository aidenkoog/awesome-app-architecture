package io.github.aidenkoog.android.presentation.gallery

import android.widget.ImageView
import io.github.aidenkoog.android.domain.model.Album

interface OnGalleryCallback {
    fun navigateToAlbumPage(album: Album)
    fun gotoDetailPageByPhotoId(imageView: ImageView, id: Long)
}
