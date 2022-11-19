package io.github.aidenkoog.android.data.source.local.dao

import androidx.room.*
import io.github.aidenkoog.android.data.source.local.entity.UserEntity

@Dao
interface UserDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(photo: UserEntity): Long

    @Query("SELECT * FROM User")
    fun loadAll(): MutableList<UserEntity>

    @Delete
    fun delete(photo: UserEntity)

    @Query("DELETE FROM User")
    fun deleteAll()

    @Query("SELECT * FROM User where id = :id")
    fun loadUserById(id: String): UserEntity?

    @Query("SELECT * FROM User where name = :name")
    fun loadUserByName(name: String): UserEntity?

    @Update
    fun update(user: UserEntity)
}