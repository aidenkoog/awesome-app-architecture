package io.github.aidenkoog.ktorclient

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import io.github.aidenkoog.ktorclient.api.ApiService
import io.github.aidenkoog.ktorclient.api.ApiServiceImpl
import io.github.aidenkoog.ktorclient.model.PostResponse
import io.github.aidenkoog.ktorclient.model.Resource
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
        Log.i("debug", ":launchTestKtorApi")
        CoroutineScope(Dispatchers.IO).launch {
            when (val responseList: Resource<List<PostResponse>> = apiService.getPosts()) {
                else -> {
                    if (responseList.data == null) {
                        Log.e("debug", "responseList data is null !!!")
                        return@launch
                    }
                    for (i in responseList.data.indices) {
                        Log.d("debug", "response[i].id : ${responseList.data[i].id}")
                        Log.d("debug", "response[i].body : ${responseList.data[i].body}")
                        Log.d("debug", "response[i].title : ${responseList.data[i].title}")
                        Log.d("debug", "response[i].userId : ${responseList.data[i].userId}")
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