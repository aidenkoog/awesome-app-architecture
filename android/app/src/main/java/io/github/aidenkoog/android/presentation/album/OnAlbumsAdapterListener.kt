package io.github.aidenkoog.android.presentation.album

import io.github.aidenkoog.android.domain.model.Album

/**
 * To make an interaction between [AlbumsAdapter] & [AlbumsFragment]
 * */
interface OnAlbumsAdapterListener {
    fun showPhotos(album: Album)
}
