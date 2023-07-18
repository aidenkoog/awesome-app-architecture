package io.github.aidenkoog.image_viewer.data

import androidx.paging.PagingSource
import androidx.paging.PagingState
import io.github.aidenkoog.image_viewer.api.NaverImageSearchService
import io.github.aidenkoog.image_viewer.model.Item
import java.lang.Exception

// getRefreshKey and load functions have to be overrided.
class NaverImageSearchDataSource(
    private val query: String,
    private val imageSearchService: NaverImageSearchService
) : PagingSource<Int, Item>() {

    // pass key to load() when refreshing is executed or invalidation occurs after first data is loaded.
    override fun getRefreshKey(state: PagingState<Int, Item>): Int? {
        return state.anchorPosition?.let {
            val closestPageToPosition = state.closestPageToPosition(it)
            closestPageToPosition?.prevKey?.plus(defaultDisplay)
                ?: closestPageToPosition?.nextKey?.minus(defaultDisplay)
        }
    }

    // Paging library concept, load's concept.
    // LoadParams.
    // LoadResult.
    override suspend fun load(params: LoadParams<Int>): LoadResult<Int, Item> {
        val start = params.key ?: defaultStart

        return try {
            val response = imageSearchService.getImages(query, params.loadSize, start)

            val items = response.items
            val nextKey = if (items.isEmpty()) {
                null
            } else {
                start + params.loadSize
            }
            val prevKey = if (start == defaultStart) {
                null
            } else {
                start - defaultDisplay
            }
            // paging specification.
            LoadResult.Page(items, prevKey, nextKey)
        } catch (exception: Exception) {
            LoadResult.Error(exception)
        }
    }

    companion object {
        const val defaultStart = 1
        const val defaultDisplay = 10
    }
}