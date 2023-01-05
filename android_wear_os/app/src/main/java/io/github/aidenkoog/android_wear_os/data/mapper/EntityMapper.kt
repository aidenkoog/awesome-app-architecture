package io.github.aidenkoog.android_wear_os.data.mapper

import io.github.aidenkoog.android_wear_os.data.sources.local.entity.AppEntity
import io.github.aidenkoog.android_wear_os.domain.model.DeviceInfo

fun DeviceInfo.toEntity() = AppEntity(
    id = id,
    description = description,
)