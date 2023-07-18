package io.github.aidenkoog.image_viewer.ui.main.favorite

import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import io.github.aidenkoog.image_viewer.model.Item
import io.github.aidenkoog.image_viewer.ui.main.view_holder.ImageSearchViewHolder

class FavouritesAdapter : RecyclerView.Adapter<ImageSearchViewHolder>() {
    private var items : List<Item> = listOf()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ImageSearchViewHolder {
        return ImageSearchViewHolder.create({}, parent)
    }

    override fun onBindViewHolder(holder: ImageSearchViewHolder, position: Int) {
        val item = items[position]
        holder.bind(item)
    }

    override fun getItemCount(): Int {
        return items.size
    }

    fun setItems(items: List<Item>) {
        this.items = items
        notifyDataSetChanged()
    }
}