@file:Suppress("DEPRECATION")

package io.github.aidenkoog.android.data

import androidx.room.Room
import androidx.test.InstrumentationRegistry
import androidx.test.runner.AndroidJUnit4
import io.github.aidenkoog.android.data.mapper.toEntity
import io.github.aidenkoog.android.data.source.local.AppDatabase
import io.github.aidenkoog.android.domain.model.User
import io.github.aidenkoog.android.util.TestUtil
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.hamcrest.CoreMatchers.equalTo
import org.hamcrest.MatcherAssert.assertThat
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import java.io.IOException

@Suppress("DEPRECATION")
@RunWith(AndroidJUnit4::class)
class UserDaoTest {

    private lateinit var mDatabase: AppDatabase

    @Before
    fun createDb() {
        mDatabase = Room.inMemoryDatabaseBuilder(
            InstrumentationRegistry.getTargetContext(), AppDatabase::class.java
        ).build()
    }

    @After
    @Throws(IOException::class)
    fun closeDb() {
        mDatabase.close()
    }

    @Test
    @Throws(Exception::class)
    fun isUserListEmpty() {
        assertEquals(0, mDatabase.userDao.loadAll().size)
    }

    @Test
    @Throws(Exception::class)
    fun insertPhoto() {
        val user: User = TestUtil.createUser(7)
        val insertedUser = mDatabase.userDao.insert(user.toEntity())
        assertNotNull(insertedUser)
    }

    @Test
    @Throws(Exception::class)
    fun insertUserAndLoadByTitle() {
        val testTitle = "test user title!"
        val user: User = TestUtil.createUser(1)
        mDatabase.userDao.insert(user.toEntity())
        val userLoadedByTitle = mDatabase.userDao.loadOneByUserTitle(testTitle)
        assertThat(userLoadedByTitle, equalTo(user))
    }

    @Test
    @Throws(Exception::class)
    fun retrievesUsers() {
        val userList = TestUtil.makeUserList(5)
        userList.forEach {
            mDatabase.userDao.insert(it.toEntity())
        }
        val loadedUsers = mDatabase.userDao.loadAll()
        assertEquals(userList, loadedUsers)
    }

    @Test
    @Throws(Exception::class)
    fun deleteUser() {
        val user = TestUtil.createUser(8)
        mDatabase.userDao.delete(user.toEntity())

        val loadOneByUserId = mDatabase.userDao.loadOneByUserId(8)
        assertNull(loadOneByUserId)
    }

    @Test
    @Throws(Exception::class)
    fun deleteAllUsers() {
        mDatabase.userDao.deleteAll()
        val loadedAllUsers = mDatabase.userDao.loadAll()
        assert(loadedAllUsers.isEmpty())
    }
}
