package io.github.aidenkoog.android_wear_os.data.sources.local.dao

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import io.github.aidenkoog.android_wear_os.data.sources.local.entity.AppEntity

@Dao
interface AppDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(entity: AppEntity): Long

    @Query("SELECT * FROM App")
    fun loadAll(): MutableList<AppEntity>

    @Delete
    fun delete(entity: AppEntity)

    @Query("DELETE FROM App")
    fun deleteAll()

    @Query("SELECT * FROM App where id = :id")
    fun loadOneById(id: Long): AppEntity?

    @Query("SELECT * FROM App where description = :description")
    fun loadOneByDescription(description: String): AppEntity?

    @Update
    fun update(entity: AppEntity)
}