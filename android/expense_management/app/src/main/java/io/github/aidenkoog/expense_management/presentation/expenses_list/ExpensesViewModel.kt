package io.github.aidenkoog.expense_management.presentation.expenses_list

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import io.github.aidenkoog.expense_management.common.Resource
import io.github.aidenkoog.expense_management.domain.model.Expense
import io.github.aidenkoog.expense_management.domain.use_cases.get_expenses.FilterExpensesUseCase
import io.github.aidenkoog.expense_management.domain.use_cases.get_expenses.GetExpensesUseCase
import io.github.aidenkoog.expense_management.domain.use_cases.get_expenses.SumTotalExpensesUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import javax.inject.Inject

@HiltViewModel
class ExpensesViewModel @Inject constructor(
    private val getExpensesUseCase: GetExpensesUseCase,
    private val sumTotalExpensesUseCase: SumTotalExpensesUseCase,
    private val filterExpensesUseCase: FilterExpensesUseCase
    ) : ViewModel() {
    private val _state = mutableStateOf(ExpensesState())
    val state: State<ExpensesState> = _state

    init {
        getExpenses()
    }

    fun onEvent(event: ExpensesEvent) {
        when(event) {
            is ExpensesEvent.Retry -> {
                getExpenses()
            }

        }
    }

    private fun getExpenses() {
        getExpensesUseCase().onEach { result ->
            when (result) {
                is Resource.Success -> {
                    result.data?.let { sumTotalExpense(it) }
                }
                is Resource.Error -> {
                    _state.value = ExpensesState(
                        error = result.message ?: "An unexpected error occurred"
                    )
                }
                is Resource.Loading -> {
                    _state.value = ExpensesState(isLoading = true)
                }
            }
        }.launchIn(viewModelScope)
    }

    private fun sumTotalExpense(expenses: List<Expense>) {
        sumTotalExpensesUseCase(expenses).onEach { result ->
            when (result) {
                is Resource.Success -> {
                    _state.value = ExpensesState(expenses = expenses, totalExpenses = result.data)
                }
                is Resource.Error -> {
                    _state.value = ExpensesState(
                        error = result.message ?: "An unexpected error occurred"
                    )
                }
                is Resource.Loading -> {
                    _state.value = ExpensesState(isLoading = true)
                }
            }
        }.launchIn(viewModelScope)

    }

    private fun filterExpenseByTitleOrCategory(expenses: List<Expense>, searchKeyword: String) {
        filterExpensesUseCase(expenses, searchKeyword).onEach { result ->
            when (result) {
                is Resource.Success -> {
                    _state.value = ExpensesState(expenses = expenses, filteredExpenses = result.data)
                }
                is Resource.Error -> {
                    _state.value = ExpensesState(
                        error = result.message ?: "An unexpected error occurred"
                    )
                }
                is Resource.Loading -> {
                    _state.value = ExpensesState(isLoading = true)
                }
            }
        }.launchIn(viewModelScope)

    }

}
