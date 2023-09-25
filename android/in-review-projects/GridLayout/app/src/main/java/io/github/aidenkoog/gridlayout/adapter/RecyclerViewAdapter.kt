package io.github.aidenkoog.gridlayout.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import io.github.aidenkoog.gridlayout.R
import io.github.aidenkoog.gridlayout.models.RecyclerModel

class RecyclerViewAdapter(val context: Context, val itemList: ArrayList<RecyclerModel>) :
    RecyclerView.Adapter<RecyclerViewAdapter.RecyclerViewHolder>() {

    class RecyclerViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val imgItemImage: ImageView = view.findViewById(R.id.imgItemImage)
        val txtTitle: TextView = view.findViewById(R.id.txtTitle)
        val txtPrice: TextView = view.findViewById(R.id.txtPrice)

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.recycler_view_item, parent, false)

        return RecyclerViewHolder(view)
    }

    override fun onBindViewHolder(holder: RecyclerViewHolder, position: Int) {
        val component = itemList[position]
        holder.txtPrice.text = component.price
        holder.txtTitle.text = component.title
        holder.imgItemImage.setImageResource(component.image)
    }

    override fun getItemCount(): Int {
        return (itemList.size)
    }


}