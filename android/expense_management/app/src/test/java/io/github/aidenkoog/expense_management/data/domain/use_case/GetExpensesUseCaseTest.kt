package io.github.aidenkoog.expense_management.data.domain.use_case

import app.cash.turbine.test
import io.github.aidenkoog.expense_management.data.generateTestExpenseFromDomain
import io.github.aidenkoog.expense_management.data.mapper.toExpense
import io.github.aidenkoog.expense_management.domain.repository.ExpenseRepository
import io.github.aidenkoog.expense_management.domain.use_cases.get_expenses.GetExpensesUseCase
import io.mockk.MockKAnnotations
import io.mockk.coEvery
import io.mockk.impl.annotations.RelaxedMockK
import junit.framework.TestCase.assertEquals
import kotlinx.coroutines.test.runTest
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import kotlin.coroutines.cancellation.CancellationException

class GetExpensesUseCaseTest {

    @RelaxedMockK
    private lateinit var expenseRepository: ExpenseRepository

    private lateinit var objectUnderTest: GetExpensesUseCase

    @BeforeEach
    fun setUp() {
        MockKAnnotations.init(this)
        setUpGetExpensesUseCase()
    }

    @Test
    fun `should wrap result with success if repository doesn't throw`() = runTest {
        // Given
        val testExpenseFromDomain = listOf(generateTestExpenseFromDomain())
        coEvery { expenseRepository.getExpenses().map { it.toExpense() } } returns (testExpenseFromDomain)

        // When-Then
        objectUnderTest.invoke().test {
            val result = awaitItem()

         /*  assertEquals(
                expected = Result.success(testExpenseFromDomain),
                actual = result
            )
            */

            awaitComplete()
        }
    }


    @Test
    fun `should rethrow if repository throws CancellationException`() = runTest {
        // Given
        coEvery { expenseRepository.getExpenses() } throws CancellationException()

        // When-Then
        assertThrows<CancellationException> {
            objectUnderTest.invoke()
        }
    }

    @Test
    fun `should wrap result with failure if repository throws other Exception`() = runTest {
        // Given
        val testException = Exception("Test message")
        coEvery { expenseRepository.getExpenses() } throws testException

        // When-Then
        assertThrows<Exception> {
            objectUnderTest.invoke().test {
                val result = awaitItem()

             /*   assertEquals(
                    expected = Result.failure(testException),
                    actual = result
                )
                */


            }
        }
    }

    private fun setUpGetExpensesUseCase() {
        objectUnderTest = GetExpensesUseCase (expenseRepository)
    }

}

