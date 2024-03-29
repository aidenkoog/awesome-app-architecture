package io.github.aidenkoog.aiden_template.presentation

import android.os.Build
import android.view.WindowManager
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.foundation.background
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material3.Scaffold
import androidx.compose.material3.windowsizeclass.ExperimentalMaterial3WindowSizeClassApi
import androidx.compose.material3.windowsizeclass.calculateWindowSizeClass
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.core.view.ViewCompat
import androidx.hilt.navigation.HiltViewModelFactory
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.owl.insights.InsightsScreen
import com.example.owl.insights.InsightsViewModel
import kotlinx.coroutines.ExperimentalCoroutinesApi
import io.github.aidenkoog.aiden_template.datastore.SettingsDataStore
import io.github.aidenkoog.aiden_template.presentation.navigation.BottomNavigationBar
import io.github.aidenkoog.aiden_template.presentation.navigation.NavigationItem
import io.github.aidenkoog.aiden_template.presentation.navigation.util.shouldShowBottomBar
import io.github.aidenkoog.aiden_template.presentation.theme.navigationDarkThemeBackGroundColor
import io.github.aidenkoog.aiden_template.presentation.theme.navigationLightThemeBackGroundColor
import io.github.aidenkoog.aiden_template.presentation.ui.dashboard.DashboardScreen
import io.github.aidenkoog.aiden_template.presentation.ui.dashboard.DashboardViewModel
import io.github.aidenkoog.aiden_template.presentation.ui.explore.ExploreScreen
import io.github.aidenkoog.aiden_template.presentation.ui.explore.ExploreViewModel
import io.github.aidenkoog.aiden_template.presentation.ui.profile.ProfileScreen
import io.github.aidenkoog.aiden_template.presentation.ui.profile.ProfileViewModel
import io.github.aidenkoog.aiden_template.presentation.ui.recipe.RecipeDetailScreen
import io.github.aidenkoog.aiden_template.presentation.ui.recipe.RecipeViewModel
import io.github.aidenkoog.aiden_template.presentation.ui.recipe_list.RecipeListScreen
import io.github.aidenkoog.aiden_template.presentation.ui.recipe_list.RecipeListViewModel
import io.github.aidenkoog.aiden_template.presentation.ui.signinsignup.SignInRoute
import io.github.aidenkoog.aiden_template.presentation.ui.signinsignup.SignUpRoute
import io.github.aidenkoog.aiden_template.presentation.ui.signinsignup.WelcomeRoute
import io.github.aidenkoog.aiden_template.presentation.ui.survey.SurveyRoute
import io.github.aidenkoog.aiden_template.presentation.util.ConnectivityManager

@RequiresApi(Build.VERSION_CODES.O)
@OptIn(
    ExperimentalMaterialApi::class,
    ExperimentalCoroutinesApi::class,
    ExperimentalComposeUiApi::class,
    ExperimentalMaterial3WindowSizeClassApi::class
)

@Composable
fun MobinApp(
    activity: MainActivity,
    connectivityManager: ConnectivityManager,
    settingsDataStore: SettingsDataStore
) {


    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route
    val widthSizeClass = calculateWindowSizeClass(activity).widthSizeClass


    /*
    set bottom navigation color
     */

    //todo use compose new method to set bottom bar color
    activity.window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
    if (settingsDataStore.isDark.value) {
        activity.window.navigationBarColor = navigationDarkThemeBackGroundColor.toArgb()
        ViewCompat.getWindowInsetsController(activity.window.decorView)?.isAppearanceLightNavigationBars =
            false
    } else {
        activity.window.navigationBarColor = navigationLightThemeBackGroundColor.toArgb()
        ViewCompat.getWindowInsetsController(activity.window.decorView)?.isAppearanceLightNavigationBars =
            true
    }



    Scaffold(
        bottomBar = {
            if (shouldShowBottomBar(currentRoute)) {
                BottomNavigationBar(
                    navController = navController,
                    isDarkTheme = settingsDataStore.isDark.value,
                    onToggleTheme = settingsDataStore::toggleTheme,
                    currentRoute = currentRoute,
                )
            }

        },
        content = { scaffoldPadding ->
            NavHost(navController, startDestination = NavigationItem.Dashboard.route) {


                // Welcome New User Screen
                composable(
                    route = NavigationItem.Welcome.route
                ) {
                    WelcomeRoute(
                        onNavigateToSignIn = {
                            navController.navigate("signin/$it")
                        },
                        onNavigateToSignUp = {
                            navController.navigate("signup/$it")
                        },
                        onSignInAsGuest = {
                            navController.navigate(NavigationItem.Survey.route)
                        },
                    )
                }


                //Survey Screen
                composable(
                    route = NavigationItem.Survey.route
                ) {
                    SurveyRoute(
                        onNavUp = {},
                        onSurveyComplete = { navController.navigate(NavigationItem.Dashboard.route) },
                        fragmentManager = (activity as AppCompatActivity).supportFragmentManager
                    )
                }


                //Signing User
                composable(NavigationItem.SignIn.route) {
                    val startingEmail = it.arguments?.getString("email")
                    SignInRoute(
                        email = startingEmail,
                        onSignInSubmitted = {
                            navController.navigate(NavigationItem.Survey.route)
                        },
                        onSignInAsGuest = {
                            navController.navigate(NavigationItem.Survey.route)
                        },
                        onNavUp = navController::navigateUp,
                    )
                }

                //SignUp User
                composable(NavigationItem.SignUp.route) {
                    val startingEmail = it.arguments?.getString("email")
                    SignUpRoute(
                        email = startingEmail,
                        onSignUpSubmitted = {
                            navController.navigate(NavigationItem.Survey.route)
                        },
                        onSignInAsGuest = {
                            navController.navigate(NavigationItem.Survey.route)
                        },
                        onNavUp = navController::navigateUp,
                    )
                }

                //Dashboard Screen
                composable(
                    route = NavigationItem.Dashboard.route
                ) { navBackStackEntry ->
                    val factory = HiltViewModelFactory(LocalContext.current, navBackStackEntry)
                    val viewModel: DashboardViewModel =
                        viewModel(activity, "DashboardViewModel", factory)
                    DashboardScreen(
                        isDarkTheme = settingsDataStore.isDark.value,
                        isNetworkAvailable = connectivityManager.isNetworkAvailable.value,
                        onToggleTheme = settingsDataStore::toggleTheme,
                        onNavigateToRecipeDetailScreen = navController::navigate,
                        viewModel = viewModel,
                        scaffoldPadding = scaffoldPadding,
                        onDateSelectionClicked = {},
                        openDrawer = {},
                        widthSize = widthSizeClass,
                        onExploreItemClicked = {

                        }
                    )
                }

                //Insights Screen
                composable(
                    route = NavigationItem.Insights.route
                ) { navBackStackEntry ->
                    val factory = HiltViewModelFactory(LocalContext.current, navBackStackEntry)
                    val viewModel: InsightsViewModel =
                        viewModel(activity, "InsightsViewModel", factory)
                    InsightsScreen(
                        isDarkTheme = settingsDataStore.isDark.value,
                        isNetworkAvailable = connectivityManager.isNetworkAvailable.value,
                        onToggleTheme = settingsDataStore::toggleTheme,
                        onNavigateToRecipeDetailScreen = navController::navigate,
                        viewModel = viewModel,
                        scaffoldPadding = scaffoldPadding
                    )
                }


                //Listing
                composable(
                    route = NavigationItem.List.route
                ) { navBackStackEntry ->
                    val factory = HiltViewModelFactory(LocalContext.current, navBackStackEntry)
                    val viewModel: RecipeListViewModel =
                        viewModel(activity, "RecipeListViewModel", factory)
                    RecipeListScreen(
                        isDarkTheme = settingsDataStore.isDark.value,
                        isNetworkAvailable = connectivityManager.isNetworkAvailable.value,
                        onToggleTheme = settingsDataStore::toggleTheme,
                        onNavigateToRecipeDetailScreen = navController::navigate,
                        viewModel = viewModel,
                        scaffoldPadding = scaffoldPadding
                    )
                }


                //Listing Detail
                composable(
                    route = NavigationItem.RecipeDetail.route + "/{recipeId}",
                    arguments = listOf(navArgument("recipeId") {
                        type = NavType.IntType
                    })
                ) { navBackStackEntry ->
                    val factory = HiltViewModelFactory(LocalContext.current, navBackStackEntry)
                    val viewModel: RecipeViewModel =
                        viewModel(activity, "RecipeDetailViewModel", factory)
                    RecipeDetailScreen(
                        isDarkTheme = settingsDataStore.isDark.value,
                        isNetworkAvailable = connectivityManager.isNetworkAvailable.value,
                        recipeId = navBackStackEntry.arguments?.getInt("recipeId"),
                        viewModel = viewModel,
                        scaffoldPadding = scaffoldPadding
                    )
                }


                //Explore Screen
                composable(
                    route = NavigationItem.Explore.route
                ) { navBackStackEntry ->
                    val factory = HiltViewModelFactory(LocalContext.current, navBackStackEntry)
                    val viewModel: ExploreViewModel =
                        viewModel(activity, "ExploreViewModel", factory)
                    ExploreScreen(
                        isDarkTheme = settingsDataStore.isDark.value,
                        isNetworkAvailable = connectivityManager.isNetworkAvailable.value,
                        onToggleTheme = settingsDataStore::toggleTheme,
                        onNavigateToRecipeDetailScreen = navController::navigate,
                        viewModel = viewModel,
                        scaffoldPadding = scaffoldPadding
                    )
                }


                //Profile Screen
                composable(
                    route = NavigationItem.Profile.route
                ) { navBackStackEntry ->
                    val factory = HiltViewModelFactory(LocalContext.current, navBackStackEntry)
                    val viewModel: ProfileViewModel =
                        viewModel(activity, "ProfileViewModel", factory)
                    ProfileScreen(
                        isDarkTheme = settingsDataStore.isDark.value,
                        isNetworkAvailable = connectivityManager.isNetworkAvailable.value,
                        onToggleTheme = settingsDataStore::toggleTheme,
                        onNavigateToRecipeDetailScreen = navController::navigate,
                        viewModel = viewModel,
                        scaffoldPadding = scaffoldPadding
                    )
                }

//
//                composable(NavigationItem.Dashboard.route) {
//                    val mainViewModel = hiltViewModel<MainViewModel>()
//                    CraneHome(
//                        widthSize = widthSizeClass,
//                        onExploreItemClicked = { },
//                        onDateSelectionClicked = {},
//                        viewModel = mainViewModel
//                    )
//
//                }


            }

        },
    )

}



