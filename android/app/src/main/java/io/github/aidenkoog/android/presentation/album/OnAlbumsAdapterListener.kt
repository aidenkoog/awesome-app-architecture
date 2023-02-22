package io.github.aidenkoog.android.presentation.album

import io.github.aidenkoog.android.domain.model.Album

interface OnAlbumsAdapterListener {
    fun showPhotos(album: Album)
}
