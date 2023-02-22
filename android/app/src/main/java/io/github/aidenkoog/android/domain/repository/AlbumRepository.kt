package io.github.aidenkoog.android.domain.repository

import io.github.aidenkoog.android.domain.model.Album
import io.reactivex.Single

interface AlbumRepository {
    fun getAlbums(): Single<List<Album>>
}
