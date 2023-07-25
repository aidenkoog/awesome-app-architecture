package io.github.aidenkoog.expense_management.presentation.expense_details

import io.github.aidenkoog.expense_management.domain.model.Expense

data class ExpenseDetailsState(
    val isLoading: Boolean = false,
    val expenses: List<Expense>? = emptyList(),
    val error: String = "",
    var totalExpenses: String = ""
)
