package io.github.aidenkoog.expense_management.presentation.expense_details

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import io.github.aidenkoog.expense_management.common.Resource
import io.github.aidenkoog.expense_management.domain.use_cases.get_expenses.GetExpensesUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import javax.inject.Inject

@HiltViewModel
class ExpenseDetailsViewModel @Inject constructor(
    ) : ViewModel() {
    private val _state = mutableStateOf(ExpenseDetailsState())
    val state: State<ExpenseDetailsState> = _state

    init {


    }

    fun onEvent(event: ExpenseDetailsEvent) {
        when(event) {
            is ExpenseDetailsEvent.Retry -> {

            }

        }
    }

}
