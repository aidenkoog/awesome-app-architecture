package io.github.aidenkoog.aiden_template.presentation.ui.profile


import io.github.aidenkoog.aiden_template.presentation.ui.profile.ProfileCategory.*

enum class ProfileCategory(val value: String){
    ERROR("error"),
    CHICKEN("Chicken"),
    BEEF("Beef"),
    SOUP("Soup"),
    DESSERT("Dessert"),
    VEGETARIAN("Vegetarian"),
    MILK("Milk"),
    VEGAN("Vegan"),
    PIZZA("Pizza"),
    DONUT("Donut"),
}

fun getAllProfileCategories(): List<ProfileCategory>{
    return listOf(
        ERROR, CHICKEN, BEEF, SOUP, DESSERT, VEGETARIAN, MILK, VEGAN, PIZZA, DONUT)
}

fun getProfileCategory(value: String): ProfileCategory? {
    val map = values().associateBy(ProfileCategory::value)
    return map[value]
}