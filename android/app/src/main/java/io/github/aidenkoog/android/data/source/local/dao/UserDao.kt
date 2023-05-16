package io.github.aidenkoog.android.data.source.local.dao

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import io.github.aidenkoog.android.data.source.local.entity.UserEntity

@Dao
interface UserDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(userEntity: UserEntity)

    @Query("SELECT * FROM User")
    fun loadAll(): MutableList<UserEntity>

    @Delete
    fun delete(userEntity: UserEntity)

    @Query("DELETE FROM User")
    fun deleteAll()

    @Query("SELECT * FROM User where id = :id")
    fun loadOneByUserId(id: Int): UserEntity?

    @Query("SELECT * FROM User where title = :userTitle")
    fun loadOneByUserTitle(userTitle: String): UserEntity?

    @Update
    fun update(userEntity: UserEntity)
}
