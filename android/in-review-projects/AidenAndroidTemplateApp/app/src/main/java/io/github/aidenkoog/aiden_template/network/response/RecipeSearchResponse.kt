package io.github.aidenkoog.aiden_template.network.response

import io.github.aidenkoog.aiden_template.network.model.RecipeDto
import com.google.gson.annotations.SerializedName

data class RecipeSearchResponse(

        @SerializedName("count")
        var count: Int,

        @SerializedName("results")
        var recipes: List<RecipeDto>,
)