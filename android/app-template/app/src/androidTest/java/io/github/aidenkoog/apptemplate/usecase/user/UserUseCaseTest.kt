package io.github.aidenkoog.apptemplate.usecase.user

import android.annotation.SuppressLint
import android.content.Context
import androidx.test.core.app.ApplicationProvider
import androidx.test.ext.junit.runners.AndroidJUnit4
import dagger.hilt.android.testing.HiltAndroidRule
import dagger.hilt.android.testing.HiltAndroidTest
import io.github.aidenkoog.apptemplate.data.api.UserApi
import io.github.aidenkoog.apptemplate.domain.usecase.base.handleError
import io.github.aidenkoog.apptemplate.domain.usecase.base.onError
import io.github.aidenkoog.apptemplate.domain.usecase.base.onResponse
import io.github.aidenkoog.apptemplate.domain.usecase.feature.UserUseCase
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.launch
import kotlinx.coroutines.test.runTest
import org.junit.After
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import timber.log.Timber
import java.text.SimpleDateFormat
import java.util.Date
import javax.inject.Inject

/**
 * User UseCase Test.
 * Testing template code.
 *
 * Reference.
 * https://developer.android.com/training/dependency-injection/hilt-testing#kotlin
 */

@HiltAndroidTest
@RunWith(AndroidJUnit4::class)
class UserUseCaseTest {

    @get:Rule
    val hiltRule = HiltAndroidRule(this)

    // Click Board related UseCases
    private lateinit var userUseCase: UserUseCase

    // Hilt - Injection object.
    @Inject
    lateinit var userApi: UserApi

    // Context
    lateinit var context: Context

    // Constants for Testing.
    companion object {
        val ioDispatcher = Dispatchers.Default
    }

    @Before
    fun setUp() {
        println("Initialize environment for testing.")

        // Load application context.
        context = ApplicationProvider.getApplicationContext()

        // Do Hilt injection.
        hiltRule.inject()

        // Initialize usecases.
        userUseCase = UserUseCase(ioDispatcher)
    }

    @After
    fun releaseResources() = println("release!")

    @SuppressLint("SimpleDateFormat")
    private fun getTimestampAsDateType(): String {
        val currentMillis = System.currentTimeMillis()
        val dateFormat = SimpleDateFormat("yyyy-MM-dd")
        val result = dateFormat.format(Date(currentMillis))

        Timber.d("timestamp date format result: $result")
        return result
    }

    // Testcase 1. Get user data information.
    @ExperimentalCoroutinesApi
    @Test
    fun getUsers() = runTest {
        println("Testcase 1. Get user data")
        launch {
            userUseCase(0L).onResponse {
                println("[Success]!")
                println("[Success] Result: $it")

            }.onError(30000) {
                println("Failed !!!")

            }.onError(50000) {
                println("Failed !!!")

            }.handleError { // etc.
                println("Failed !!!")
            }
        }
        println("Testcase 1. End - Get user data")
    }
}