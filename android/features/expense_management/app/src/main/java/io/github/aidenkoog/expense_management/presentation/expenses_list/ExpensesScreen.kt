package io.github.aidenkoog.expense_management.presentation.expenses_list

import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Scaffold
import androidx.compose.material.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import io.github.aidenkoog.expense_management.presentation.expenses_list.components.TopAppBar
import io.github.aidenkoog.expense_management.presentation.expenses_list.components.ExpenseList
import io.github.aidenkoog.expense_management.R


@Composable
fun ExpensesScreen(navController: NavController,
                   viewModel: ExpensesViewModel = hiltViewModel()) {

    val state = viewModel.state.value

    Scaffold(
        content = {

            BodyContent(
                navController = navController,
                UiState = state,
                retryFetchingExpenses = {
                    viewModel.onEvent(ExpensesEvent.Retry)
                }

            )
        }

    )
}

@Composable
fun BodyContent(
    navController: NavController,
    UiState: ExpensesState,
    retryFetchingExpenses: () -> Unit
) {
    val stringRes = R.string.app_name
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colors.primary
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            TopAppBar(stringRes)

            ExpenseList(
                navController = navController,
                uiState = UiState,
                retry = {
                    retryFetchingExpenses()
                }
            )
        }
    }
}


