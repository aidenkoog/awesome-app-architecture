package io.github.aidenkoog.ktorclient

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import io.github.aidenkoog.ktorclient.api.ApiService
import io.github.aidenkoog.ktorclient.api.ApiServiceImpl
import io.github.aidenkoog.ktorclient.model.PostResponse
import io.github.aidenkoog.ktorclient.provider.Provider
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {

    private val httpClient = Provider.client
    private lateinit var apiService: ApiService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        initializeApiService()
        launchTestKtorApi()
    }

    private fun initializeApiService() {
        apiService = ApiServiceImpl(httpClient)
    }

    private fun launchTestKtorApi() {
        CoroutineScope(Dispatchers.IO).launch {
            when (val responseList: List<PostResponse>? = apiService.getPosts()) {
                null -> {
                    return@launch
                }
                else -> {
                    for (i in responseList.indices) {
                        Log.e("debug", "response[i].id : ${responseList[i].id}")
                        Log.e("debug", "response[i].body : ${responseList[i].body}")
                        Log.e("debug", "response[i].title : ${responseList[i].title}")
                        Log.e("debug", "response[i].userId : ${responseList[i].userId}")
                    }
                }
            }
        }
    }

    override fun onDestroy() {
        Log.e("debug", "onDestroy!!!")
        super.onDestroy()
    }
}