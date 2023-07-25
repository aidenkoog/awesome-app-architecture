package io.github.aidenkoog.expense_management.presentation.expenses_list.components.style

import androidx.compose.material.darkColors
import androidx.compose.material.lightColors
import androidx.compose.ui.graphics.Color


val deepPurple = Color(0xFF4a148c)
val darkColor = Color(0xFF121212)

val sourceTextColor = Color(0xFF474646)
val sourceTextColorDark = Color(0xFF868080)

val titleColor = Color.Black
val titleColorDark = Color(0xB3DCDCDC)

val listBackgroundColor = Color.White
val listBackgroundColorDark = Color(0xFF1E1E1E)



val TextWhite = Color(0xffeeeeee)
val DeepBlue = Color(0xff06164c)
val ButtonBlue = Color(0xff505cf3)
val DarkerButtonBlue = Color(0xff566894)
val LightRed = Color(0xfffc879a)

private val lightTheme = lightColors(
    primary = deepPurple,
    onPrimary = Color.White,
    primaryVariant = deepPurple,
    surface = listBackgroundColor,
    onSurface = titleColor,
    secondary = sourceTextColor,
    onSecondary = Color.White,
    background = listBackgroundColor,
    onBackground = titleColor,
    secondaryVariant = deepPurple,
    error = Color.Black,
    onError = Color.White
)

private val darkTheme = darkColors(
    primary = darkColor,
    onPrimary = Color.White,
    primaryVariant = darkColor,
    surface = listBackgroundColorDark,
    onSurface = titleColorDark,
    secondary = sourceTextColorDark,
    onSecondary = Color.White,
    background = listBackgroundColorDark,
    onBackground = titleColorDark,
    secondaryVariant = darkColor,
    error = Color.White,
    onError = Color.Black
)
