package io.github.aidenkoog.aiden_template.network.model

import io.github.aidenkoog.aiden_template.domain.model.Recipe
import io.github.aidenkoog.aiden_template.domain.util.DomainMapper
import io.github.aidenkoog.aiden_template.util.DateUtils


class RecipeDtoMapper : DomainMapper<RecipeDto, Recipe> {

    override fun mapToDomainModel(model: RecipeDto): Recipe {
        return Recipe(
            id = model.pk,
            title = model.title,
            featuredImage = model.featuredImage,
            rating = model.rating,
            publisher = model.publisher,
            sourceUrl = model.sourceUrl,
            ingredients = model.ingredients,
            dateAdded = DateUtils.longToDate(model.longDateAdded),
            dateUpdated = DateUtils.longToDate(model.longDateUpdated),
        )
    }

    override fun mapFromDomainModel(domainModel: Recipe): RecipeDto {
        return RecipeDto(
            pk = domainModel.id,
            title = domainModel.title,
            featuredImage = domainModel.featuredImage,
            rating = domainModel.rating,
            publisher = domainModel.publisher,
            sourceUrl = domainModel.sourceUrl,
            ingredients = domainModel.ingredients,
            longDateAdded = DateUtils.dateToLong(domainModel.dateAdded),
            longDateUpdated = DateUtils.dateToLong(domainModel.dateUpdated),
        )
    }

    fun toDomainList(initial: List<RecipeDto>): List<Recipe>{
        return initial.map { mapToDomainModel(it) }
    }

    fun fromDomainList(initial: List<Recipe>): List<RecipeDto>{
        return initial.map { mapFromDomainModel(it) }
    }


}
