package io.github.aidenkoog.image_viewer

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.viewpager2.widget.ViewPager2
import com.google.android.material.tabs.TabLayoutMediator
import io.github.aidenkoog.image_viewer.databinding.ActivityMainBinding
import io.github.aidenkoog.image_viewer.ui.main.pager.SectionsPagerAdapter

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // view pager adapter about main and favorite screen.
        val sectionsPagerAdapter = SectionsPagerAdapter(this)
        val viewPager: ViewPager2 = binding.viewPager

        viewPager.adapter = sectionsPagerAdapter

        // setup tab layout
        TabLayoutMediator(binding.tabs, viewPager) { tab, position ->
            tab.text = if (position == 0) {
                resources.getString(R.string.home_image_search_tab_text)
            } else {
                resources.getString(R.string.home_favorite_tab_text)
            }
        }.attach()
    }
}