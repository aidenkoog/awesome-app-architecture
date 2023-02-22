package io.github.aidenkoog.android.presentation.album

import androidx.lifecycle.MutableLiveData
import io.github.aidenkoog.android.domain.model.Album

class AlbumViewModel(val album: Album) {

    val albumData = MutableLiveData<Album>()

    init {
        albumData.value = album
    }
}
