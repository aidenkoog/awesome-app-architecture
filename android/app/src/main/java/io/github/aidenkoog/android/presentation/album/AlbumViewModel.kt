package io.github.aidenkoog.android.presentation.album

import androidx.lifecycle.MutableLiveData
import io.github.aidenkoog.android.domain.model.Album

/**A helper class for the UI controller that is responsible for
 * preparing data for [AlbumViewModel] as the UI
 * */
class AlbumViewModel(val album: Album) {

    val albumData = MutableLiveData<Album>()

    init {
        albumData.value = album
    }
}
