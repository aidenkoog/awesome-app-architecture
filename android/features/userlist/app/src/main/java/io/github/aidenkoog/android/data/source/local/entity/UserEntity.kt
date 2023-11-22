package io.github.aidenkoog.android.data.source.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "User")
data class UserEntity(
    @PrimaryKey var id: Int,
    var userId: Int,
    val title: String,
    val body: String?,
)
