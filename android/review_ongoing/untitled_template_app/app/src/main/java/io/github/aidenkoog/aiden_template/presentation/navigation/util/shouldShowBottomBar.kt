package io.github.aidenkoog.aiden_template.presentation.navigation.util

import io.github.aidenkoog.aiden_template.presentation.navigation.NavigationItem

 fun shouldShowBottomBar(route: String?): Boolean {
    val bottomBarRoutes = setOf(
        NavigationItem.Dashboard.route,
        NavigationItem.Insights.route,
        NavigationItem.List.route,
        NavigationItem.Explore.route,
        NavigationItem.Profile.route
    )
    return route in bottomBarRoutes
}
