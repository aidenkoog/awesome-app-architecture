package io.github.aidenkoog.android.presentation.photo

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import io.github.aidenkoog.android.domain.model.Photo
import io.github.aidenkoog.android.domain.usecase.GetPhotosUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class PhotosViewModel @Inject constructor(
    private val getPhotosUseCase: GetPhotosUseCase
) : ViewModel() {

    val photoListReceivedLiveData = MutableLiveData<List<Photo>>()
    val isLoad = MutableLiveData<Boolean>()

    init {
        isLoad.value = false
    }

    fun loadPhotos(id: Long?) {
        if (id == null) return
        getPhotosUseCase.saveAlbumId(id)
        getPhotosUseCase.execute(
            onSuccess = {
                isLoad.value = true
                photoListReceivedLiveData.value = it
            },
            onError = {
                it.printStackTrace()
            }
        )
    }
}