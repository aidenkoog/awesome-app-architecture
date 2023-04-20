import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import 'package:flutter_web_navigation/core.dart';
import 'package:flutter_web_navigation/presentation/theme/theme_model.dart';
import 'package:get/get.dart';

import 'utils/theme_util.dart';

class App extends StatefulWidget {
  final bool isLoggedIn;
  const App({Key? key, required this.isLoggedIn}) : super(key: key);

  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  late ThemeModel _themeModel;

  @override
  void initState() {
    _themeModel = ThemeModel.instance;
    _themeModel.initializeProperties();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    if (_themeModel.isWebFullView) {
      _themeModel.currentThemeData = ThemeData.from(
          colorScheme: const ColorScheme.light().copyWith(
              primary: _themeModel.currentPaletteColor,
              secondary: _themeModel.currentPaletteColor));
      _themeModel.paletteBorderColors = <Color>[];
      _themeModel.changeTheme(_themeModel.currentThemeData!);
    }
    Color currentPaletteColor = _themeModel.currentPaletteColor;

    return GetMaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: appTitle,
      theme: getLightThemeSetting(currentPaletteColor),
      darkTheme: getDarkThemeSetting(currentPaletteColor),
      routeInformationParser: RoutesInformationParser(),
      routerDelegate: AppRouterDelegate(isLoggedIn: widget.isLoggedIn),
    );
  }
}
