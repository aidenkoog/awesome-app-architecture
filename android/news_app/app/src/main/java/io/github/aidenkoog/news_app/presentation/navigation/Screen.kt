package io.github.aidenkoog.news_app.presentation.navigation

/**
 * Represents the different navigation routes of the app.
 */
sealed class Screen(val route: String) {
    object SearchNews : Screen("search_news")
    object NewsDetail : Screen("news_detail")
}
