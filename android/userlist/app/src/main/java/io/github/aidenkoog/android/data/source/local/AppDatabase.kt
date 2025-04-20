package io.github.aidenkoog.android.data.source.local

import androidx.room.Database
import androidx.room.RoomDatabase
import io.github.aidenkoog.android.data.source.local.dao.UserDao
import io.github.aidenkoog.android.data.source.local.entity.UserEntity

@Database(entities = [UserEntity::class], version = 1, exportSchema = false)
abstract class AppDatabase : RoomDatabase() {

    abstract val userDao: UserDao

    companion object {
        const val DB_NAME = "AppDatabase.db"
    }
}
