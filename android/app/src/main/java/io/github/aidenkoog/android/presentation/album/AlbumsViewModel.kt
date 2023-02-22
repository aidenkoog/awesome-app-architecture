package io.github.aidenkoog.android.presentation.album

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import io.github.aidenkoog.android.domain.model.Album
import io.github.aidenkoog.android.domain.usecase.GetAlbumsUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class AlbumsViewModel @Inject constructor(private val getAlbumListUseCase: GetAlbumsUseCase) :
    ViewModel() {

    val albumsReceivedLiveData = MutableLiveData<List<Album>>()
    val isLoad = MutableLiveData<Boolean>()
    val albumData = MutableLiveData<Album>()

    init {
        isLoad.value = false
    }

    val album: Album? get() = albumData.value

    fun set(album: Album) = run { albumData.value = album }

    fun loadAlbums() {
        getAlbumListUseCase.execute(
            onSuccess = {
                isLoad.value = true
                albumsReceivedLiveData.value = it
            },
            onError = {
                it.printStackTrace()
            }
        )
    }
}
