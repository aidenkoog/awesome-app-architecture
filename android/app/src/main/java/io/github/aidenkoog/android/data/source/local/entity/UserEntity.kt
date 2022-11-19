package io.github.aidenkoog.android.data.source.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "User")
data class UserEntity(
    @PrimaryKey var id: String,
    var name: String,
    val accessToken: String,
    val refreshToken: String
)