package io.github.aidenkoog.image_viewer.data

import androidx.paging.Pager
import androidx.paging.PagingConfig
import androidx.paging.PagingData
import kotlinx.coroutines.flow.Flow
import io.github.aidenkoog.image_viewer.api.NaverImageSearchService
import io.github.aidenkoog.image_viewer.model.Item
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class NaverImageSearchRepository {

    // the client id and secret key needed when getting photo data from naver cloud.
    companion object {
        const val CLIENT_ID = "cjsB1l28Vh7tgocuhPuS"
        const val CLIENT_SECRET_KEY = "MHNlSOdBJu"
    }

    private val service: NaverImageSearchService

    init {
        val logger = HttpLoggingInterceptor()
        logger.level = HttpLoggingInterceptor.Level.BASIC

        val client = OkHttpClient.Builder().addInterceptor { chain ->
            // setup header information for calling photo related api provided from naver company.
            val request =
                chain.request().newBuilder()
                    .addHeader("X-Naver-Client-Id", CLIENT_ID)
                    .addHeader("X-Naver-Client-Secret", CLIENT_SECRET_KEY).build()
            chain.proceed(request)
        }.addInterceptor(logger).build()

        service = Retrofit.Builder().baseUrl("https://openapi.naver.com").client(client)
            .addConverterFactory(GsonConverterFactory.create()).build()
            .create(NaverImageSearchService::class.java)
    }

    // the pager object calls the load() method from the PagingSource object,
    // providing it with the LoadParams object and receiving the LoadResult object in return.
    fun getImageSearch(query: String): Flow<PagingData<Item>> {
        return Pager(config = PagingConfig(
            pageSize = NaverImageSearchDataSource.defaultDisplay, enablePlaceholders = false
        ), pagingSourceFactory = {
            NaverImageSearchDataSource(query, service)
        }).flow  // flow variable in Pager.
    }
}