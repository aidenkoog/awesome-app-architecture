package io.github.aidenkoog.expense_management.presentation.expenses_list

sealed class ExpensesEvent {
    object Retry: ExpensesEvent()
    object FilterExpenses: ExpensesEvent()

}
