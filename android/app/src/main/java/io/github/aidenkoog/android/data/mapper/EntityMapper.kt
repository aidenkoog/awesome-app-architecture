package io.github.aidenkoog.android.data.mapper

import io.github.aidenkoog.android.data.source.local.entity.UserEntity
import io.github.aidenkoog.android.domain.model.User

fun User.toEntity() = UserEntity(id = id, title = title, userId = userId, body = body)
