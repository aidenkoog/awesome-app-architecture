package io.github.aidenkoog.expense_management.presentation.expenses_list.components

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import io.github.aidenkoog.expense_management.R
import io.github.aidenkoog.expense_management.presentation.expenses_list.ExpensesState
import com.remlexworld.newsapp.presentation.news_feed.components.style.articleTitleStyle


@Composable
fun ExpenseList(
    navController: NavController,
    uiState: ExpensesState,
    retry: () -> Unit
) {
    Surface(
        color = MaterialTheme.colors.background,
        shape = RoundedCornerShape(topStart = 5.dp, topEnd = 5.dp),
        modifier = Modifier
            .fillMaxSize()
            .padding(
                start = 0.dp,
                end = 0.dp,
                bottom = 0.dp,
                top = 0.dp
            )
    ) {

        when {
            uiState.isLoading -> {
                CircularLoader()
            }

            uiState.filteredExpenses?.isEmpty() == false -> {
                ExpenseList(
                    navController = navController,
                    expenses = uiState.filteredExpenses
                )
            }
            uiState.expenses?.isEmpty() == false -> {
                ExpenseList(
                    navController = navController,
                    expenses = uiState.expenses
                )
            }
            uiState.error.isNotEmpty() -> {
                ErrorView(
                    errorMessage = uiState.error,
                    retry = retry
                )
            }

        }

        Box(Modifier.fillMaxSize()) {

            uiState.totalExpenses?.let {
                if (it.isNotEmpty()) {
                    Text(text = "Total: $$it",
                        modifier = Modifier.align(Alignment.BottomStart).padding(20.dp))
                }
            }

        }


    }
}

@Composable
private fun CircularLoader() {
    Column(
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        CircularProgressIndicator(
            color = MaterialTheme.colors.primary
        )
    }
}

@Composable
fun ErrorView(
    errorMessage: String,
    retry: () -> Unit
) {
    Column(
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = errorMessage,
            style = articleTitleStyle.copy(color = MaterialTheme.colors.onSurface)
        )

        TextButton(onClick = retry) {
            Text(
                text = stringResource(id = R.string.retry),
                style = TextStyle(
                    color = MaterialTheme.colors.onSurface
                )
            )
        }

    }


}
