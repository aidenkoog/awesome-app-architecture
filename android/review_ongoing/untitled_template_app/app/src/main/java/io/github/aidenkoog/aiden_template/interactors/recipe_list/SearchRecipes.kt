package io.github.aidenkoog.aiden_template.interactors.recipe_list

import io.github.aidenkoog.aiden_template.network.RecipeService
import io.github.aidenkoog.aiden_template.cache.RecipeDao
import io.github.aidenkoog.aiden_template.cache.model.RecipeEntityMapper
import io.github.aidenkoog.aiden_template.domain.data.DataState
import io.github.aidenkoog.aiden_template.domain.model.Recipe
import io.github.aidenkoog.aiden_template.network.model.RecipeDtoMapper
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import io.github.aidenkoog.aiden_template.util.RECIPE_PAGINATION_PAGE_SIZE

class SearchRecipes(
    private val recipeDao: RecipeDao,
    private val recipeService: RecipeService,
    private val entityMapper: RecipeEntityMapper,
    private val dtoMapper: RecipeDtoMapper,
) {

  fun execute(
      token: String,
      page: Int,
      query: String,
  ): Flow<DataState<List<Recipe>>> = flow {
    try {
      emit(DataState.loading())

      // just to show pagination, api is fast
//      delay(1000)

      // force error for testing
      if (query == "error") {
          throw Exception("Search FAILED!")
      }

      try{
        // Convert: NetworkRecipeEntity -> Recipe -> RecipeCacheEntity
        val recipes = getRecipesFromNetwork(
          token = token,
          page = page,
          query = query,
        )

        // insert into cache
        recipeDao.insertRecipes(entityMapper.toEntityList(recipes))
      }catch (e: Exception){
        // There was a network issue
        e.printStackTrace()
      }

      // query the cache
      val cacheResult = if (query.isBlank()) {
        recipeDao.getAllRecipes(
            pageSize = RECIPE_PAGINATION_PAGE_SIZE,
            page = page
        )
      } else {
        recipeDao.searchRecipes(
            query = query,
            pageSize = RECIPE_PAGINATION_PAGE_SIZE,
            page = page
        )
      }

      // emit List<Recipe> from cache
      val list = entityMapper.fromEntityList(cacheResult)

      emit(DataState.success(list))
    } catch (e: Exception) {
      emit(DataState.error<List<Recipe>>(e.message ?: "Unknown Error"))
    }
  }

  // WARNING: This will throw exception if there is no network connection
  private suspend fun getRecipesFromNetwork(
      token: String,
      page: Int,
      query: String
  ): List<Recipe> {
    return dtoMapper.toDomainList(
        recipeService.search(
            token = token,
            page = page,
            query = query,
        ).recipes
    )
  }
}