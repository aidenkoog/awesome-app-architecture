import 'package:flutter/material.dart';

// get light theme setting.
ThemeData getLightThemeSetting(Color currentPaletteColor) {
  return ThemeData.from(
          colorScheme: const ColorScheme.light().copyWith(
              primary: currentPaletteColor, secondary: currentPaletteColor))
      .copyWith(
          scrollbarTheme: const ScrollbarThemeData().copyWith(
              thumbColor: MaterialStateProperty.all(
                  const Color.fromRGBO(128, 128, 128, 0.3))));
}

// get dark theme setting.
ThemeData getDarkThemeSetting(Color currentPaletteColor) {
  return ThemeData.from(
          colorScheme: const ColorScheme.dark().copyWith(
              primary: currentPaletteColor,
              secondary: currentPaletteColor,
              onPrimary: Colors.white))
      .copyWith(
          scrollbarTheme: const ScrollbarThemeData().copyWith(
              thumbColor: MaterialStateProperty.all(
                  const Color.fromRGBO(255, 255, 255, 0.3))));
}
