package io.github.aidenkoog.android.util

import io.github.aidenkoog.android.domain.model.User

object TestUtil {

    fun createUser(id: Int) = User(id = id, title = "", userId = 0, body = "")

    fun makeUserList(size: Int): MutableList<User> {
        val list = ArrayList<User>(size)
        list.forEach {
            it.title = "User ${list.indexOf(it)}"
            it.id = (list.indexOf(it) + 1)
            list.add(it)
        }
        return list
    }
}
