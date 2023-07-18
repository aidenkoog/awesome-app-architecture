package io.github.aidenkoog.image_viewer.ui.main.search

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.paging.PagingData
import androidx.paging.cachedIn
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import io.github.aidenkoog.image_viewer.data.NaverImageSearchRepository
import io.github.aidenkoog.image_viewer.model.Item

class ImageSearchViewModel : ViewModel() {

    private val repository = NaverImageSearchRepository()
    private val queryFlow = MutableSharedFlow<String>()

    private val favorites = mutableSetOf<Item>()
    private val _favoritesFlow = MutableSharedFlow<List<Item>>(replay = 1)

    val pagingDataFlow = queryFlow
        .flatMapLatest {
            searchImages(it)
        }
        .cachedIn(viewModelScope)

    val favoritesFlow = _favoritesFlow.asSharedFlow()

    private fun searchImages(query: String): Flow<PagingData<Item>> =
        repository.getImageSearch(query)

    fun handleQuery(query: String) {
        viewModelScope.launch {
            queryFlow.emit(query)
        }
    }

    fun toggle(item: Item) {
        if (favorites.contains(item)) {
            favorites.remove(item)
        } else {
            favorites.add(item)
        }
        viewModelScope.launch {
            _favoritesFlow.emit(favorites.toList())
        }
    }
}