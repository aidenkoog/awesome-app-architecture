package io.github.aidenkoog.android.presentation.photo

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import io.github.aidenkoog.android.domain.model.Photo

class PhotoViewModel(val photo: Photo) : ViewModel() {

    val photoData = MutableLiveData<Photo>()

    init {
        photoData.value = photo
    }
}
