package io.github.aidenkoog.android.domain.usecase

import io.github.aidenkoog.android.domain.model.Photo
import io.github.aidenkoog.android.domain.repository.PhotoRepository
import io.github.aidenkoog.android.domain.usecase.base.SingleUseCase
import io.reactivex.Single
import javax.inject.Inject

class GetPhotosUseCase @Inject constructor(
    private val repository: PhotoRepository
) : SingleUseCase<List<Photo>>() {

    private var albumId: Long? = null

    fun saveAlbumId(id: Long) {
        albumId = id
    }

    override fun buildUseCaseSingle(): Single<List<Photo>> {
        return repository.getPhotos(albumId)
    }
}
