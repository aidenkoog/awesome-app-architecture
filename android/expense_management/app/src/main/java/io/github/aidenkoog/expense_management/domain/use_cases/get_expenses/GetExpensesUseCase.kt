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

class GetExpensesUseCase @Inject constructor(private val repository: ExpenseRepository) {

    operator fun invoke(): Flow<Resource<List<Expense>>> = flow {
        try {
            emit(Resource.Loading())

            var remoteExpenses = repository.getExpenses()

            emit(Resource.Success(remoteExpenses.map { it.toExpense() }))

        } catch (e: HttpException) {
            emit(Resource.Error(e.localizedMessage ?: "An unexpected error occurred"))
        } catch (e: IOException) {
            emit(
                Resource.Error(
                    e.localizedMessage
                        ?: "Couldn't reach the server. Check your internet connection"
                )
            )

        }
    }


}