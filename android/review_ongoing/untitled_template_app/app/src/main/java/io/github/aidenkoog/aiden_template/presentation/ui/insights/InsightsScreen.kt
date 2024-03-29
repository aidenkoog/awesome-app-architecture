package com.example.owl.insights

import android.annotation.SuppressLint
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.material.rememberScaffoldState
import androidx.compose.runtime.Composable
import androidx.compose.ui.ExperimentalComposeUiApi
import kotlinx.coroutines.ExperimentalCoroutinesApi
import io.github.aidenkoog.aiden_template.presentation.components.RecipeList
import io.github.aidenkoog.aiden_template.presentation.theme.AppTheme


@SuppressLint("UnusedMaterialScaffoldPaddingParameter")
@ExperimentalComposeUiApi
@ExperimentalCoroutinesApi
@ExperimentalMaterialApi
@Composable
fun InsightsScreen(
  isDarkTheme: Boolean,
  isNetworkAvailable: Boolean,
  onToggleTheme: () -> Unit,
  onNavigateToRecipeDetailScreen: (String) -> Unit,
  viewModel: InsightsViewModel,
  scaffoldPadding : PaddingValues
) {


  val recipes = viewModel.recipes.value

  val query = viewModel.query.value

  val selectedCategory = viewModel.selectedCategory.value

  val loading = viewModel.loading.value

  val page = viewModel.page.value

  val dialogQueue = viewModel.dialogQueue

  val scaffoldState = rememberScaffoldState()

  AppTheme(
    displayProgressBar = loading,
    scaffoldState = scaffoldState,
    darkTheme = isDarkTheme,
    isNetworkAvailable = isNetworkAvailable,
    dialogQueue = dialogQueue.queue.value,
  ) {
    Scaffold(

      scaffoldState = scaffoldState,
      snackbarHost = {
        scaffoldState.snackbarHostState
      },
    ) {
      Text(text = "Insights")
    }
  }
}