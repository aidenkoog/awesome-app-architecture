package io.github.aidenkoog.aiden_template.presentation.ui.explore

import android.util.Log
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import io.github.aidenkoog.aiden_template.domain.model.Recipe
import io.github.aidenkoog.aiden_template.interactors.recipe_list.RestoreRecipes
import io.github.aidenkoog.aiden_template.interactors.recipe_list.SearchRecipes
import io.github.aidenkoog.aiden_template.presentation.ui.util.DialogQueue
import io.github.aidenkoog.aiden_template.presentation.util.ConnectivityManager
import io.github.aidenkoog.aiden_template.util.TAG
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.launch
import javax.inject.Inject
import javax.inject.Named



@HiltViewModel
class ExploreViewModel
@Inject
constructor(
    private val searchRecipes: SearchRecipes,
    private val restoreRecipes: RestoreRecipes,
    private val connectivityManager: ConnectivityManager,
    private @Named("auth_token") val token: String,
    private val savedStateHandle: SavedStateHandle,
) : ViewModel() {





    val loading = mutableStateOf(false)



    val dialogQueue = DialogQueue()

    init {


    }





}
















