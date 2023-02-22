package io.github.aidenkoog.android.domain.usecase

import io.github.aidenkoog.android.domain.model.Album
import io.github.aidenkoog.android.domain.repository.AlbumRepository
import io.github.aidenkoog.android.domain.usecase.base.SingleUseCase
import io.reactivex.Single
import javax.inject.Inject

class GetAlbumsUseCase @Inject constructor(
    private val repository: AlbumRepository
) : SingleUseCase<List<Album>>() {

    override fun buildUseCaseSingle(): Single<List<Album>> {
        return repository.getAlbums()
    }
}
