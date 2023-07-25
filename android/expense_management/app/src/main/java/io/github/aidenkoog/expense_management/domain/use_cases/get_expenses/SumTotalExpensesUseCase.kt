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

class SumTotalExpensesUseCase @Inject constructor() {

    operator fun invoke(expenses: List<Expense>): Flow<Resource<String>> = flow {
        try {

            var totalAmount = sumTotalAmount(expenses)

            emit(Resource.Success(totalAmount.toString()))

        } catch (e: Exception) {
            emit(Resource.Error(e.localizedMessage ?: "An unexpected error occurred"))
        }
    }

    private fun sumTotalAmount (expenses: List<Expense>) : Double {
        var totalAmount = 0.0
        for(expense in expenses){
                totalAmount += expense.amount!!
            }

        return totalAmount
    }

}