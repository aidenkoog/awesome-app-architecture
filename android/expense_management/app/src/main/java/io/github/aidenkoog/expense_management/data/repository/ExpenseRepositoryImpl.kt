package io.github.aidenkoog.expense_management.data.repository

import io.github.aidenkoog.expense_management.data.remote.ExpenseApi
import io.github.aidenkoog.expense_management.data.remote.dto.ExpenseDto
import io.github.aidenkoog.expense_management.domain.repository.ExpenseRepository
import javax.inject.Inject

class ExpenseRepositoryImpl @Inject constructor(
    private val expenseApi: ExpenseApi
) : ExpenseRepository {


    override suspend fun getExpenses(): List<ExpenseDto> {
        return expenseApi.getExpenses()

    }


}