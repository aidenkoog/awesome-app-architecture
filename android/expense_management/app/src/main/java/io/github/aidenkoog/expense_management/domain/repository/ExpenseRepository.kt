package io.github.aidenkoog.expense_management.domain.repository

import io.github.aidenkoog.expense_management.data.remote.dto.ExpenseDto

interface ExpenseRepository {
    suspend fun getExpenses(): List<ExpenseDto>
}