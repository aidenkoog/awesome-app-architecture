package io.github.aidenkoog.image_viewer.ui.main.view_holder

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import io.github.aidenkoog.image_viewer.R
import io.github.aidenkoog.image_viewer.databinding.ImageSearchItemBinding
import io.github.aidenkoog.image_viewer.model.Item

class ImageSearchViewHolder(
    private val like: (Item) -> Unit,
    private val binding: ImageSearchItemBinding
) : RecyclerView.ViewHolder(binding.root) {

    fun bind(item: Item?) {
        item?.let { item ->
            Glide.with(binding.root)
                // load thumbnail data of item.
                .load(item.thumbnail)
                .centerCrop()
                // imageview.
                .into(binding.imageView)
            binding.imageView.setOnClickListener {
                // invoke method.
                like.invoke(item)
            }
        }
    }

    companion object {
        fun create(
            like: (Item) -> Unit,
            parent: ViewGroup
        ): ImageSearchViewHolder {
            // inflate image_search_item layout.
            val view = LayoutInflater.from(parent.context)
                .inflate(R.layout.image_search_item, parent, false)
            val binding = ImageSearchItemBinding.bind(view)
            return ImageSearchViewHolder(like, binding)
        }
    }
}