package io.github.aidenkoog.expense_management.domain.use_cases.get_expenses

import io.github.aidenkoog.expense_management.common.Resource
import io.github.aidenkoog.expense_management.data.mapper.toExpense
import io.github.aidenkoog.expense_management.data.remote.dto.ExpenseDto
import io.github.aidenkoog.expense_management.domain.model.Expense
import io.github.aidenkoog.expense_management.domain.repository.ExpenseRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import retrofit2.HttpException
import java.io.IOException
import javax.inject.Inject

class FilterExpensesUseCase @Inject constructor() {

    operator fun invoke(expenses: List<Expense>, searchKeyword: String): Flow<Resource<List<Expense>>> = flow {
        try {
            emit(Resource.Loading())

            var filteredExpensesByCategory = expenses.filter { expense -> expense.tripBudgetCategory == searchKeyword }
            var filteredExpensesByTitle = expenses.filter { expense -> expense.expenseVenueTitle == searchKeyword }

            if (filteredExpensesByCategory.isNotEmpty()) {
                emit(Resource.Success(filteredExpensesByCategory))
            } else {
                emit(Resource.Success(filteredExpensesByTitle))
            }


        } catch (e: Exception) {
            emit(Resource.Error(e.localizedMessage ?: "An unexpected error occurred"))
        }
    }


}