package io.github.aidenkoog.news_app.presentation

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import io.github.aidenkoog.news_app.presentation.navigation.NewsNavHost
import io.github.aidenkoog.news_app.presentation.theme.TheNewsAppTheme
import dagger.hilt.android.AndroidEntryPoint

/**
 * Main and single activity of the app.
 */
@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            TheNewsAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                   NewsNavHost()
                }
            }
        }
    }
}