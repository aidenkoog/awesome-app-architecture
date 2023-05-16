package io.github.aidenkoog.android.presentation.adapters

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.databinding.ViewDataBinding
import androidx.recyclerview.widget.RecyclerView
import io.github.aidenkoog.android.R
import io.github.aidenkoog.android.databinding.HolderUsersBinding
import io.github.aidenkoog.android.domain.model.User
import io.github.aidenkoog.android.presentation.listeners.OnUsersAdapterListener
import io.github.aidenkoog.android.presentation.viewmodel.UserViewModel

internal class UsersAdapter(val listener: OnUsersAdapterListener) :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    private val userList: MutableList<User> = ArrayList()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        val holderUsersBinding = DataBindingUtil.inflate<ViewDataBinding>(
            LayoutInflater.from(parent.context), R.layout.holder_users, parent, false
        )
        return UsersViewHolder(holderUsersBinding)
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        (holder as UsersViewHolder).onBind(getItem(position))
    }

    private fun getItem(position: Int): User {
        return userList[position]
    }

    override fun getItemCount(): Int {
        return userList.size
    }

    @SuppressLint("NotifyDataSetChanged")
    fun addData(list: List<User>) {
        this.userList.clear()
        this.userList.addAll(list)
        notifyDataSetChanged()
    }

    inner class UsersViewHolder(
        private val dataBinding: ViewDataBinding,
    ) : RecyclerView.ViewHolder(dataBinding.root) {

        fun onBind(user: User) {
            val holderAlbumBinding = dataBinding as HolderUsersBinding
            val userViewModel = UserViewModel(user)
            holderAlbumBinding.userViewModel = userViewModel

            itemView.setOnClickListener {
                listener.showUsers(user)
            }
        }
    }
}
