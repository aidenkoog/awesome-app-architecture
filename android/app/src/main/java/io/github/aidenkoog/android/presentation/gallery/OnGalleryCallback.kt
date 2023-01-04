package io.github.aidenkoog.android.presentation.gallery

import android.widget.ImageView
import io.github.aidenkoog.android.domain.model.Album

/**
 * To make an interaction between [GalleryActivity] & its children
 * */
interface OnGalleryCallback {
    fun navigateToAlbumPage(album: Album)
    fun gotoDetailPageByPhotoId(imageView: ImageView, id: Long)
}
