package io.github.aidenkoog.apptemplate2nd.ui.favorites

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import io.github.aidenkoog.apptemplate2nd.R
import io.github.aidenkoog.apptemplate2nd.core.Resource
import io.github.aidenkoog.apptemplate2nd.data.model.Cocktail
import io.github.aidenkoog.apptemplate2nd.databinding.FavoriteFragmentBinding
import io.github.aidenkoog.apptemplate2nd.presentation.MainViewModel
import io.github.aidenkoog.apptemplate2nd.utils.show
import io.github.aidenkoog.apptemplate2nd.utils.showToast
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class FavoritesFragment : Fragment(R.layout.favorite_fragment),
    FavoritesAdapter.OnCocktailClickListener {
    private val viewModel by activityViewModels<MainViewModel>()
    private lateinit var favoritesAdapter: FavoritesAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        favoritesAdapter = FavoritesAdapter(requireContext(), this)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val binding = FavoriteFragmentBinding.bind(view)

        binding.rvTragosFavoritos.layoutManager = LinearLayoutManager(requireContext())
        binding.rvTragosFavoritos.adapter = favoritesAdapter

        viewModel.getFavoriteItems().observe(viewLifecycleOwner, Observer { result ->
            when (result) {
                is Resource.Loading -> {
                }

                is Resource.Success -> {
                    if (result.data.isEmpty()) {
                        binding.emptyContainer.root.show()
                        return@Observer
                    }
                    favoritesAdapter.setlist(result.data)
                }

                is Resource.Failure -> {
                    showToast("An error occurred ${result.exception}")
                }
            }
        })
    }

    override fun onCocktailClick(cocktail: Cocktail, position: Int) {
        findNavController().navigate(
            FavoritesFragmentDirections.actionFavoritosFragmentToTragosDetalleFragment(
                cocktail
            )
        )
    }

    override fun onCocktailLongClick(cocktail: Cocktail, position: Int) {
        viewModel.deleteFavoriteCocktail(cocktail)
    }
}