package io.github.aidenkoog.apptemplate2nd.presentation


import androidx.hilt.lifecycle.ViewModelInject
import androidx.lifecycle.*
import io.github.aidenkoog.apptemplate2nd.application.ToastHelper
import io.github.aidenkoog.apptemplate2nd.core.Resource
import io.github.aidenkoog.apptemplate2nd.domain.CocktailRepository
import io.github.aidenkoog.apptemplate2nd.data.model.Cocktail
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

class MainViewModel @ViewModelInject constructor(
    private val repository: CocktailRepository,
    private val toastHelper: ToastHelper,
    private val savedStateHandle: SavedStateHandle
) : ViewModel() {

    private val currentCocktailName =
        savedStateHandle.getLiveData<String>("cocktailName", "margarita")

    fun setCocktail(cocktailName: String) {
        currentCocktailName.value = cocktailName
    }

    val fetchlist = currentCocktailName.distinctUntilChanged().switchMap { cocktailName ->
        liveData(viewModelScope.coroutineContext + Dispatchers.IO) {
            emit(Resource.Loading)
            try {
                repository.getCocktailByName(cocktailName).collect {
                    emit(it)
                }
            } catch (e: Exception) {
                emit(Resource.Failure(e))
            }
        }
    }

    fun saveOrDeleteFavoriteCocktail(cocktail: Cocktail) {
        viewModelScope.launch {
            if (repository.isCocktailFavorite(cocktail)) {
                repository.deleteFavoriteCocktail(cocktail)
                toastHelper.sendToast("Cocktail deleted from favorites")
            } else {
                repository.saveFavoriteCocktail(cocktail)
                toastHelper.sendToast("Cocktail saved to favorites")
            }
        }
    }

    fun getFavoriteItems() =
        liveData<Resource<List<Cocktail>>>(viewModelScope.coroutineContext + Dispatchers.IO) {
            emit(Resource.Loading)
            try {
                emitSource(repository.getFavoritesItems().map { Resource.Success(it) })
            } catch (e: Exception) {
                emit(Resource.Failure(e))
            }
        }

    fun deleteFavoriteCocktail(cocktail: Cocktail) {
        viewModelScope.launch {
            repository.deleteFavoriteCocktail(cocktail)
            toastHelper.sendToast("Cocktail deleted from favorites")
        }
    }

    suspend fun isCocktailFavorite(cocktail: Cocktail): Boolean =
        repository.isCocktailFavorite(cocktail)
}