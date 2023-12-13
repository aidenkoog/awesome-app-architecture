package io.github.aidenkoog.apptemplate.presentation.adapter

import androidx.recyclerview.widget.DiffUtil

/*
 * base callback definition for diff util.
 */
class BaseItemDiffCallback : DiffUtil.ItemCallback<BaseItem>() {

    override fun areItemsTheSame(oldItem: BaseItem, newItem: BaseItem): Boolean =
        oldItem.size == newItem.size

    override fun areContentsTheSame(oldItem: BaseItem, newItem: BaseItem): Boolean =
        oldItem == newItem
}