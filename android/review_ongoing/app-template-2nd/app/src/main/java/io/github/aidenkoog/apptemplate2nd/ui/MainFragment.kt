package io.github.aidenkoog.apptemplate2nd.ui

import android.os.Bundle
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.view.View
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import io.github.aidenkoog.apptemplate2nd.R
import io.github.aidenkoog.apptemplate2nd.core.Resource
import io.github.aidenkoog.apptemplate2nd.data.model.Cocktail
import io.github.aidenkoog.apptemplate2nd.databinding.FragmentMainBinding
import io.github.aidenkoog.apptemplate2nd.presentation.MainViewModel
import io.github.aidenkoog.apptemplate2nd.utils.*
import dagger.hilt.android.AndroidEntryPoint


@AndroidEntryPoint
class MainFragment : Fragment(R.layout.fragment_main),
    MainAdapter.OnTragoClickListener {
    private val viewModel by activityViewModels<MainViewModel>()
    private lateinit var mainAdapter: MainAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setHasOptionsMenu(true)

        mainAdapter = MainAdapter(requireContext(), this)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val binding = FragmentMainBinding.bind(view)

        binding.rvTragos.layoutManager = LinearLayoutManager(requireContext())
        binding.rvTragos.adapter = mainAdapter

        binding.searchView.onQueryTextChanged {
            viewModel.setCocktail(it)
        }
        viewModel.fetchlist.observe(viewLifecycleOwner, Observer { result ->
            binding.progressBar.showIf { result is Resource.Loading }

            when (result) {
                is Resource.Loading -> {
                    binding.emptyContainer.root.hide()
                }

                is Resource.Success -> {
                    if (result.data.isEmpty()) {
                        binding.rvTragos.hide()
                        binding.emptyContainer.root.show()
                        return@Observer
                    }
                    binding.rvTragos.show()
                    mainAdapter.setlist(result.data)
                    binding.emptyContainer.root.hide()
                }

                is Resource.Failure -> {
                    showToast("toast ${result.exception}")
                }
            }
        })
    }

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        super.onCreateOptionsMenu(menu, inflater)

        inflater.inflate(R.menu.main_menu, menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.favoritos -> {
                findNavController().navigate(R.id.action_mainFragment_to_favoritosFragment)
                false
            }

            else -> false
        }
    }

    override fun onCocktailClick(item: Cocktail, position: Int) {
        findNavController().navigate(
            MainFragmentDirections.actionMainFragmentToTragosDetalleFragment(
                item
            )
        )
    }
}