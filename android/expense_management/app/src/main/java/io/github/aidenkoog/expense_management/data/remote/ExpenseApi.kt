package io.github.aidenkoog.expense_management.data.remote

import io.github.aidenkoog.expense_management.data.remote.dto.ExpenseDto
import retrofit2.http.GET

interface ExpenseApi {
    @GET("178cbbee-c634-4a51-afb8-dcd75c190d29")
    suspend fun getExpenses(): List<ExpenseDto>

}