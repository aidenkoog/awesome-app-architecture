package io.github.aidenkoog.android.data.mapper

import io.github.aidenkoog.android.data.source.local.entity.PhotoEntity
import io.github.aidenkoog.android.domain.model.Photo

fun Photo.toEntity() = PhotoEntity(
    id = id,
    title = title,
    url = url,
    thumbnailUrl = thumbnailUrl
)
