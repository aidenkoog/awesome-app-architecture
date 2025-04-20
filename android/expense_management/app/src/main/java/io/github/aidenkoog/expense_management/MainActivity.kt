package io.github.aidenkoog.expense_management

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import io.github.aidenkoog.expense_management.common.Constants
import io.github.aidenkoog.expense_management.domain.model.AssetParamType
import io.github.aidenkoog.expense_management.domain.model.Expense
import io.github.aidenkoog.expense_management.presentation.Screen
import io.github.aidenkoog.expense_management.presentation.expense_details.ExpenseDetailsScreen
import io.github.aidenkoog.expense_management.presentation.expenses_list.ExpensesScreen
import io.github.aidenkoog.expense_management.presentation.expenses_list.ExpensesViewModel
import io.github.aidenkoog.expense_management.ui.theme.ExpenseAppTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {

            ExpenseAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    val navController = rememberNavController()
                    NavHost(
                        navController = navController,
                        startDestination = Screen.ExpensesListScreen.route
                    ) {


                        composable(
                            route = Screen.ExpensesListScreen.route
                        ) {
                            ExpensesScreen(navController = navController)
                        }

                        composable(
                            route = Screen.ExpenseDetailsScreen.route + "/{${Constants.PARAM_EXPENSE}}",
                            arguments = listOf(navArgument(Constants.PARAM_EXPENSE) {
                                type = AssetParamType()
                            })

                        ) {
                            val expense = it.arguments?.getParcelable<Expense>(Constants.PARAM_EXPENSE)
                            if (expense != null) {
                                ExpenseDetailsScreen(expense, navController)
                            }
                        }

                    }
                }
            }

        }
    }
}
