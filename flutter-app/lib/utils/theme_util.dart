import 'package:flutter/material.dart';

import '../presentation/theme/theme_model.dart';

ThemeData getLightThemeSetting(Color currentPaletteColor) => ThemeData.from(
        colorScheme: const ColorScheme.light().copyWith(
            primary: currentPaletteColor, secondary: currentPaletteColor))
    .copyWith(
        scrollbarTheme: const ScrollbarThemeData().copyWith(
            thumbColor: MaterialStateProperty.all(
                const Color.fromRGBO(128, 128, 128, 0.3))));

ThemeData getDarkThemeSetting(Color currentPaletteColor) => ThemeData.from(
        colorScheme: const ColorScheme.dark().copyWith(
            primary: currentPaletteColor,
            secondary: currentPaletteColor,
            onPrimary: Colors.white))
    .copyWith(
        scrollbarTheme: const ScrollbarThemeData().copyWith(
            thumbColor: MaterialStateProperty.all(
                const Color.fromRGBO(255, 255, 255, 0.3))));

void applyThemeAndPaletteColor(
    ThemeModel model, BuildContext context, int selectedValue) {
  model.selectedThemeIndex = selectedValue;
  model.backgroundColor = model.currentThemeData!.brightness == Brightness.dark
      ? model.currentPrimaryColor
      : model.currentPaletteColor;
  model.paletteColor = model.currentPaletteColor;
  model.currentThemeData = model.currentThemeData!.copyWith(
      colorScheme: model.currentThemeData!.colorScheme.copyWith(
          primary: model.currentPaletteColor,
          secondary: model.currentPaletteColor,
          onPrimary: Colors.white));
  model.changeTheme(model.currentThemeData!);
  model.notifyListeners();
  Navigator.pop(context);
}

List<Widget> addColorPalettes(ThemeModel model, [StateSetter? setState]) {
  final List<Widget> colorPaletteWidgets = <Widget>[];
  for (int i = 0; i < model.paletteColors!.length; i++) {
    colorPaletteWidgets.add(Material(
        color: model.bottomSheetBackgroundColor,
        child: Ink(
          decoration: BoxDecoration(
            color: Colors.transparent,
            border:
                Border.all(color: model.paletteBorderColors![i], width: 2.0),
            shape: BoxShape.circle,
          ),
          child: InkWell(
            onTap: () => changeColorPalette(model, i, setState),
            child: Icon(
              Icons.brightness_1,
              size: 40.0,
              color: model.paletteColors![i],
            ),
          ),
        )));
  }
  return colorPaletteWidgets;
}

void changeColorPalette(ThemeModel model, int index, [StateSetter? setState]) {
  for (int j = 0; j < model.paletteBorderColors!.length; j++) {
    model.paletteBorderColors![j] = Colors.transparent;
  }
  model.paletteBorderColors![index] = model.paletteColors![index];
  model.currentPaletteColor = model.paletteColors![index];
  model.currentPrimaryColor = model.darkPaletteColors![index];

  model.isWebFullView ? setState!(() {}) : model.notifyListeners();
}
