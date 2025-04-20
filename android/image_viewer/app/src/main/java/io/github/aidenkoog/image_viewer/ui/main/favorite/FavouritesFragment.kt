package io.github.aidenkoog.image_viewer.ui.main.favorite

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.GridLayoutManager
import kotlinx.coroutines.flow.collectLatest
import io.github.aidenkoog.image_viewer.databinding.FragmentFavouritesBinding
import io.github.aidenkoog.image_viewer.ui.main.search.ImageSearchViewModel

class FavouritesFragment : Fragment() {

    // ImageSearchViewModel is used in both FavoriteFragment and ImageSearchFragment.
    private lateinit var imageSearchViewModel: ImageSearchViewModel

    private val adapter = FavouritesAdapter()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // view model.
        imageSearchViewModel =
            ViewModelProvider(requireActivity())[ImageSearchViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        val binding = FragmentFavouritesBinding.inflate(inflater, container, false)
        val root = binding.root

        binding.recyclerView.adapter = adapter
        binding.recyclerView.layoutManager = GridLayoutManager(context, 3)

        // only when fragment ui is resumed.
        // load favorite item data when favorite page is loaded first.
        viewLifecycleOwner.lifecycleScope.launchWhenResumed {
            // it's similar to observe function to livedata.
            imageSearchViewModel.favoritesFlow.collectLatest {
                adapter.setItems(it)
            }
        }
        return root
    }
}