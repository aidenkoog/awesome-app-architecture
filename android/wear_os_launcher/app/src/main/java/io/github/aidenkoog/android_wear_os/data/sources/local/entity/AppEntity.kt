package io.github.aidenkoog.android_wear_os.data.sources.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "App")
data class AppEntity(
    @PrimaryKey var id: Long,
    var description: String,
)
