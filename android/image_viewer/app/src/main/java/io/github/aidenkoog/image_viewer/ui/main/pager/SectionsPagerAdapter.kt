package io.github.aidenkoog.image_viewer.ui.main.pager

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.viewpager2.adapter.FragmentStateAdapter
import io.github.aidenkoog.image_viewer.ui.main.favorite.FavouritesFragment
import io.github.aidenkoog.image_viewer.ui.main.search.ImageSearchFragment

class SectionsPagerAdapter(private val fragmentActivity: FragmentActivity) :
    FragmentStateAdapter(fragmentActivity) {
    override fun createFragment(position: Int): Fragment =
        if (position == 0) {
            ImageSearchFragment()
        } else {
            FavouritesFragment()
        }

    override fun getItemCount(): Int = 2
}