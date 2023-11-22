package io.github.aidenkoog.expense_management.presentation.expense_details

sealed class ExpenseDetailsEvent {
    object Retry: ExpenseDetailsEvent()

}
