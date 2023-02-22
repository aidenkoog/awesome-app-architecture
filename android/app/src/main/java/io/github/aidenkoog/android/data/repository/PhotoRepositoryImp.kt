package io.github.aidenkoog.android.data.repository

import io.github.aidenkoog.android.data.mapper.toEntity
import io.github.aidenkoog.android.data.source.local.AppDatabase
import io.github.aidenkoog.android.data.source.remote.RetrofitService
import io.github.aidenkoog.android.domain.model.Photo
import io.github.aidenkoog.android.domain.repository.PhotoRepository
import io.reactivex.Single

class PhotoRepositoryImp(
    private val database: AppDatabase,
    private val retrofitService: RetrofitService
) : PhotoRepository {

    override fun isFavorite(photoId: Long): Boolean {
        return database.photoDao.loadOneByPhotoId(photoId) != null
    }

    override fun deletePhoto(photo: Photo) {
        database.photoDao.delete(photo.toEntity())
    }

    override fun addPhoto(photo: Photo) {
        database.photoDao.insert(photo.toEntity())
    }

    override fun getPhotoDetail(photoId: Long?): Single<Photo> {
        return retrofitService.getPhotoDetail(photoId!!)
    }

    override fun getPhotos(albumId: Long?): Single<List<Photo>> {
        return retrofitService.getPhotos(albumId!!)
    }
}
