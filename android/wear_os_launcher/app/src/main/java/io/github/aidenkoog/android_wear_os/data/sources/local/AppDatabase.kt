package io.github.aidenkoog.android_wear_os.data.sources.local

import androidx.room.Database
import androidx.room.RoomDatabase
import io.github.aidenkoog.android_wear_os.data.sources.local.dao.AppDao
import io.github.aidenkoog.android_wear_os.data.sources.local.entity.AppEntity

@Database(entities = [AppEntity::class], version = 1, exportSchema = false)
abstract class AppDatabase : RoomDatabase() {

    abstract val appDao: AppDao

    companion object {
        const val DB_NAME = "AppDatabase.db"
    }
}