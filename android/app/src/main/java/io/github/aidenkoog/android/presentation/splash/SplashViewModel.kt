package io.github.aidenkoog.android.presentation.splash

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import io.github.aidenkoog.android.domain.model.AppInfo
import io.github.aidenkoog.android.domain.usecase.InitAppUseCase
import javax.inject.Inject

@HiltViewModel
class SplashViewModel @Inject constructor(
    private val initAppUseCase: InitAppUseCase
) : ViewModel() {

    val appInfoListLiveData = MutableLiveData<List<AppInfo>>()
    val isLoaded = MutableLiveData<Boolean>()

    init {
        isLoaded.value = false;
    }

    fun loadAppInfo() {
        initAppUseCase.execute(
            onSuccess = {
                isLoaded.value = true;
                appInfoListLiveData.value = it
            },
            onError = {
                it.printStackTrace()
                isLoaded.value = true;  // for test
            }
        )
    }
}