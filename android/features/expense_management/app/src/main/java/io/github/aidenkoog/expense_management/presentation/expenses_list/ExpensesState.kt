package io.github.aidenkoog.expense_management.presentation.expenses_list

import io.github.aidenkoog.expense_management.domain.model.Expense

data class ExpensesState(
    val isLoading: Boolean = false,
    val expenses: List<Expense>? = emptyList(),
    val filteredExpenses: List<Expense>? = emptyList(),
    val error: String = "",
    var totalExpenses: String? = ""
)
