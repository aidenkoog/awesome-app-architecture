package io.github.aidenkoog.image_viewer.ui.main.search

import android.view.ViewGroup
import androidx.paging.PagingDataAdapter
import androidx.recyclerview.widget.DiffUtil
import io.github.aidenkoog.image_viewer.model.Item
import io.github.aidenkoog.image_viewer.ui.main.view_holder.ImageSearchViewHolder

class ImageSearchAdapter(
    private val like: (Item) -> Unit
) : PagingDataAdapter<Item, ImageSearchViewHolder>(comparator) {

    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): ImageSearchViewHolder {
        return ImageSearchViewHolder.create(like, parent)
    }

    override fun onBindViewHolder(holder: ImageSearchViewHolder, position: Int) {
        val item = getItem(position)
        holder.bind(item)
    }

    companion object {
        val comparator = object : DiffUtil.ItemCallback<Item>() {
            override fun areItemsTheSame(oldItem: Item, newItem: Item): Boolean {
                return oldItem.thumbnail == newItem.thumbnail
            }

            override fun areContentsTheSame(oldItem: Item, newItem: Item): Boolean {
                return oldItem == newItem
            }

        }
    }
}