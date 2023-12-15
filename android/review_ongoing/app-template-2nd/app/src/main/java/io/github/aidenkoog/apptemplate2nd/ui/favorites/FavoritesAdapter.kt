package io.github.aidenkoog.apptemplate2nd.ui.favorites

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil.DiffResult.NO_POSITION
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import io.github.aidenkoog.apptemplate2nd.core.BaseViewHolder
import io.github.aidenkoog.apptemplate2nd.data.model.Cocktail
import io.github.aidenkoog.apptemplate2nd.databinding.TragosRowBinding

class FavoritesAdapter(
    private val context: Context,
    private val itemClickListener: OnCocktailClickListener
) : RecyclerView.Adapter<BaseViewHolder<*>>() {

    private var list = listOf<Cocktail>()

    interface OnCocktailClickListener {
        fun onCocktailClick(cocktail: Cocktail, position: Int)

        fun onCocktailLongClick(cocktail: Cocktail, position: Int)
    }

    fun setlist(list: List<Cocktail>) {
        this.list = list
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<*> {
        val itemBinding = TragosRowBinding.inflate(LayoutInflater.from(context), parent, false)
        val holder = MainViewHolder(itemBinding)

        holder.itemView.setOnClickListener {
            val position = holder.adapterPosition.takeIf { it != NO_POSITION }
                ?: return@setOnClickListener

            itemClickListener.onCocktailClick(list[position], position)
        }

        holder.itemView.setOnLongClickListener {
            val position = holder.adapterPosition.takeIf { it != NO_POSITION }
                ?: return@setOnLongClickListener true

            itemClickListener.onCocktailLongClick(list[position], position)

            return@setOnLongClickListener true
        }

        return holder
    }

    override fun getItemCount(): Int = list.size

    override fun onBindViewHolder(holder: BaseViewHolder<*>, position: Int) {
        when (holder) {
            is MainViewHolder -> holder.bind(list[position])
        }
    }

    private inner class MainViewHolder(
        private val binding: TragosRowBinding
    ) : BaseViewHolder<Cocktail>(binding.root) {
        override fun bind(item: Cocktail) = with(binding) {
            Glide.with(context)
                .load(item.image)
                .centerCrop()
                .into(imgCocktail)

            txtTitulo.text = item.name
            txtDescripcion.text = item.description
        }
    }
}