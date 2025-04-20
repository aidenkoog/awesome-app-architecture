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

    // shared flow is kind of flow based on hot stream.
    // there's no any value. replayCache exists.
    private val queryFlow = MutableSharedFlow<String>()

    private val favorites = mutableSetOf<Item>()

    // asSharedFlow() is used because _favoritesFlow is created with SharedFlow.
    // asSharedFlow is for capsulate flow related variable.
    private val _favoritesFlow = MutableSharedFlow<List<Item>>(replay = 1)
    val favoritesFlow = _favoritesFlow.asSharedFlow()

    // Flow<PagingData<T>> typed variable.
    val pagingDataFlow = queryFlow
        // cancel previous job if there's new job that comes in.
        .flatMapLatest {
            // call api.
            searchImages(it)
        }
        // cachedIn operator makes the data stream shareable
        // and caches the loaded data with the provided CoroutineScope.

        // return Flow<PagingData<T>>
        .cachedIn(viewModelScope) // viewModelScope provided by the lifecycle (lifecycle-viewmodel-ktx) artifact.

    // call api for getting images corresponding to keyword user input.
    private fun searchImages(query: String): Flow<PagingData<Item>> =
        repository.getImageSearch(query)

    // start to search the keyword related to photo.
    fun handleQuery(query: String) {
        // coroutine builder, launch is mandantory for using flow's emit.
        // refs. tryEmit() is able to be called without using coroutine block.
        viewModelScope.launch {
            queryFlow.emit(query)
        }
    }

    // favorite toggle function.
    // there are favorite items in favorites, MutableSet.
    fun toggle(item: Item) {
        if (favorites.contains(item)) {
            favorites.remove(item)
        } else {
            favorites.add(item)
        }
        // launch must be used to emit flow items.
        viewModelScope.launch {
            _favoritesFlow.emit(favorites.toList())
        }
    }
}