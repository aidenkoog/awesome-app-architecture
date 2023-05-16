package io.github.aidenkoog.android.presentation.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import io.github.aidenkoog.android.R
import io.github.aidenkoog.android.domain.model.User
import dagger.hilt.android.AndroidEntryPoint
import io.github.aidenkoog.android.databinding.FragmentUsersBinding
import io.github.aidenkoog.android.presentation.adapters.UsersAdapter
import io.github.aidenkoog.android.presentation.listeners.OnUsersAdapterListener
import io.github.aidenkoog.android.presentation.viewmodel.UsersViewModel

@AndroidEntryPoint
class UsersFragment : Fragment(), OnUsersAdapterListener {

    private lateinit var fragmentUsersBinding: FragmentUsersBinding

    private var adapter: UsersAdapter? = null
    private val viewModel: UsersViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        adapter = UsersAdapter(this)
        viewModel.loadUsers()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?,
    ): View {
        fragmentUsersBinding = DataBindingUtil.inflate(
            inflater, R.layout.fragment_users, container, false
        )
        fragmentUsersBinding.usersViewModel = viewModel
        fragmentUsersBinding.usersRecyclerView.adapter = adapter

        viewModel.isLoad.observe(viewLifecycleOwner) {
            it?.let { visibility ->
                fragmentUsersBinding.usersProgressBar.visibility =
                    if (visibility) View.GONE else View.VISIBLE
            }
        }

        viewModel.usersReceivedLiveData.observe(viewLifecycleOwner) {
            it?.let {
                initializeRecyclerView(it)
            }
        }
        return fragmentUsersBinding.root
    }

    override fun showUsers(user: User) {
    }

    private fun initializeRecyclerView(userList: List<User>) {
        adapter?.addData(userList)
    }

    override fun onDetach() {
        super.onDetach()
        adapter = null
    }

    companion object {
        val FRAGMENT_NAME: String = UsersFragment::class.java.name

        @JvmStatic
        fun newInstance() = UsersFragment().apply {
            arguments = Bundle().apply {}
        }
    }
}
