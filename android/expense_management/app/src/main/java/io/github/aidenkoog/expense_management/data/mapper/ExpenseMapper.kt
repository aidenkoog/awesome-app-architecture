package io.github.aidenkoog.expense_management.data.mapper

import io.github.aidenkoog.expense_management.data.remote.dto.ExpenseDto
import io.github.aidenkoog.expense_management.domain.model.Expense


fun ExpenseDto.toExpense(): Expense {
    return Expense(
        amount = amount,
        customerName = customerName,
        date = date,
        tripBudgetCategory = tripBudgetCategory,
        currencyCode = currencyCode,
        description = description,
        expenseVenueTitle = expenseVenueTitle,

    )
}


