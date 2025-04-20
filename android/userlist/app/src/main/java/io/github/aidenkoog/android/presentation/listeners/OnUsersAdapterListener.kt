package io.github.aidenkoog.android.presentation.listeners

import io.github.aidenkoog.android.domain.model.User

interface OnUsersAdapterListener {
    fun showUsers(user: User)
}
