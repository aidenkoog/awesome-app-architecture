package io.github.aidenkoog.image_viewer.ui.main.search

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.GridLayoutManager
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch
import io.github.aidenkoog.image_viewer.databinding.FragmentMainBinding

class ImageSearchFragment : Fragment() {

    private lateinit var imageSearchViewModel: ImageSearchViewModel

    private val adapter: ImageSearchAdapter = ImageSearchAdapter {
        imageSearchViewModel.toggle(it)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // deliver activity as view model store owner to create image search view model.
        imageSearchViewModel =
            ViewModelProvider(requireActivity())[ImageSearchViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        val binding = FragmentMainBinding.inflate(inflater, container, false)
        val root = binding.root // get root layout of fragment_main.xml.

        // possible to execute coroutine logic with monitoring lifecycle of fragment.
        viewLifecycleOwner.lifecycleScope.launch {
            // it's similar to observe function to livedata.
            imageSearchViewModel.pagingDataFlow.collectLatest { items ->
                adapter.submitData(items)
            }
        }

        binding.recyclerView.adapter = adapter
        binding.recyclerView.layoutManager = GridLayoutManager(context, 4)

        // this is invoked when user clicks search button.
        binding.search.setOnClickListener {
            val query = binding.editText.text.trim().toString()
            imageSearchViewModel.handleQuery(query)
        }

        return root
    }
}