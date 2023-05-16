package io.github.aidenkoog.android.presentation

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import io.github.aidenkoog.android.R
import dagger.hilt.android.AndroidEntryPoint
import io.github.aidenkoog.android.presentation.fragments.UsersFragment

@AndroidEntryPoint
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        if (savedInstanceState == null) {
            navigateToGalleryPage()
        }
    }

    private fun navigateToGalleryPage() {
        supportFragmentManager.beginTransaction().replace(
            R.id.main_container, UsersFragment.newInstance(), UsersFragment.FRAGMENT_NAME
        ).commitAllowingStateLoss()
    }
}
