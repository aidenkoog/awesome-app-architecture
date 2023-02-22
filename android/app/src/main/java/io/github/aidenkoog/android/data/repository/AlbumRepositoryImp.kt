package io.github.aidenkoog.android.data.repository

import io.github.aidenkoog.android.data.source.remote.RetrofitService
import io.github.aidenkoog.android.domain.model.Album
import io.github.aidenkoog.android.domain.repository.AlbumRepository
import io.reactivex.Single

class AlbumRepositoryImp(
    private val retrofitService: RetrofitService
) : AlbumRepository {

    override fun getAlbums(): Single<List<Album>> {
        return retrofitService.getAlbums()
    }
}
