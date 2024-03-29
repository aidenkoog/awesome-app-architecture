package io.github.aidenkoog.aiden_template.interactors.recipe

import io.github.aidenkoog.aiden_template.network.RecipeService
import io.github.aidenkoog.aiden_template.cache.RecipeDao
import io.github.aidenkoog.aiden_template.cache.model.RecipeEntityMapper
import io.github.aidenkoog.aiden_template.domain.data.DataState
import io.github.aidenkoog.aiden_template.domain.model.Recipe
import io.github.aidenkoog.aiden_template.network.model.RecipeDtoMapper
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

/**
 * Retrieve a recipe from the cache given it's unique id.
 */
class GetRecipe (
  private val recipeDao: RecipeDao,
  private val entityMapper: RecipeEntityMapper,
  private val recipeService: RecipeService,
  private val recipeDtoMapper: RecipeDtoMapper,
){

  fun execute(
    recipeId: Int,
    token: String,
    isNetworkAvailable: Boolean,
  ): Flow<DataState<Recipe>> = flow {
    try {
      emit(DataState.loading())

      // just to show loading, cache is fast
      delay(1000)

      var recipe = getRecipeFromCache(recipeId = recipeId)

      if(recipe != null){
        emit(DataState.success(recipe))
      }
      // if the recipe is null, it means it was not in the cache for some reason. So get from network.
      else{

        if(isNetworkAvailable){
          // get recipe from network
          val networkRecipe = getRecipeFromNetwork(token, recipeId) // dto -> domain

          // insert into cache
          recipeDao.insertRecipe(
            // map domain -> entity
            entityMapper.mapFromDomainModel(networkRecipe)
          )
        }

        // get from cache
        recipe = getRecipeFromCache(recipeId = recipeId)

        // emit and finish
        if(recipe != null){
          emit(DataState.success(recipe))
        }
        else{
          throw Exception("Unable to get recipe from the cache.")
        }
      }

    }catch (e: Exception){
      emit(DataState.error<Recipe>(e.message?: "Unknown Error"))
    }
  }

  private suspend fun getRecipeFromCache(recipeId: Int): Recipe? {
    return recipeDao.getRecipeById(recipeId)?.let { recipeEntity ->
      entityMapper.mapToDomainModel(recipeEntity)
    }
  }

  private suspend fun getRecipeFromNetwork(token: String, recipeId: Int): Recipe {
    return recipeDtoMapper.mapToDomainModel(recipeService.get(token, recipeId))
  }
}