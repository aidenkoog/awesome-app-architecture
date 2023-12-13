package io.github.aidenkoog.apptemplate.function

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import androidx.test.ext.junit.runners.AndroidJUnit4
import io.github.aidenkoog.apptemplate.data.api.UserApi
import io.github.aidenkoog.apptemplate.domain.usecase.base.CustomResult
import io.github.aidenkoog.apptemplate.domain.usecase.base.onResponse
import io.github.aidenkoog.apptemplate.infrastructure.retrofit.repository.RetrofitRepository
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.supervisorScope
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.withContext
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith

/**
 * UseCase Test-cases related to unit function.
 *
 * Reference.
 * https://developer.android.com/training/dependency-injection/hilt-testing#kotlin
 */

@RunWith(AndroidJUnit4::class)
class FunctionTest {

    private lateinit var context: Context

    @Before
    fun setUp() {
        println("Initialize environment for testing.")

        // Load application context.
        context = ApplicationProvider.getApplicationContext()
    }

    @After
    fun releaseResources() {
        println("release!")
    }

    // Testcase 1. Get function list information.
    @ExperimentalCoroutinesApi
    @Test
    fun getFunctionList() = runTest {
        println("Testcase 1. Get function list")
        invoke(Dispatchers.IO) {
            RetrofitRepository.create(UserApi::class.java).getUsers(
                timestamp = 0L
            )
        }.onResponse {
            println("[Success]!")
            println("[Success] Result: $it")

        }.handleError {
            println("Error: $it")
        }
        println("Testcase 1. End - Get function list")
    }

    // Supervisor scope for executing api.
    suspend operator fun <T> invoke(
        dispatcher: CoroutineDispatcher,
        block: suspend () -> T,
    ): CustomResult<T> = supervisorScope {
        try {
            CustomResult.Success(withContext(dispatcher) { block() })

        } catch (e: Exception) {
            CustomResult.Failure(e)
        }
    }
}