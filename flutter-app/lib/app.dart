import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core.dart';
import 'package:flutter_web_navigation/temp/model.dart';
import 'package:get/get.dart';

import 'assets/messages.dart';

class App extends StatefulWidget {
  final bool isLoggedIn;
  const App({Key? key, required this.isLoggedIn}) : super(key: key);

  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  late SampleModel _sampleListModel;

  @override
  void initState() {
    _sampleListModel = SampleModel.instance;
    _initializeProperties();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    if (_sampleListModel.isWebFullView) {
      _sampleListModel.currentThemeData = ThemeData.from(
          colorScheme: const ColorScheme.light().copyWith(
              primary: _sampleListModel.currentPaletteColor,
              secondary: _sampleListModel.currentPaletteColor));
      _sampleListModel.paletteBorderColors = <Color>[];
      _sampleListModel.changeTheme(_sampleListModel.currentThemeData!);
    }

    return GetMaterialApp.router(
      // disable debug mode banner.
      debugShowCheckedModeBanner: false,
      title: 'Flutter AidenKooG\'s Admin System',

      // light theme.
      theme: ThemeData.from(
              colorScheme: const ColorScheme.light().copyWith(
                  primary: _sampleListModel.currentPaletteColor,
                  secondary: _sampleListModel.currentPaletteColor))
          .copyWith(
              scrollbarTheme: const ScrollbarThemeData().copyWith(
                  thumbColor: MaterialStateProperty.all(
                      const Color.fromRGBO(128, 128, 128, 0.3)))),

      // dark theme.
      darkTheme: ThemeData.from(
              colorScheme: const ColorScheme.dark().copyWith(
                  primary: _sampleListModel.currentPaletteColor,
                  secondary: _sampleListModel.currentPaletteColor,
                  onPrimary: Colors.white))
          .copyWith(
              scrollbarTheme: const ScrollbarThemeData().copyWith(
                  thumbColor: MaterialStateProperty.all(
                      const Color.fromRGBO(255, 255, 255, 0.3)))),

      // locale setting. (refs. currently, not working)
      translations: Messages(),
      locale: Get.deviceLocale,
      fallbackLocale: const Locale('en', 'US'),

      // route setting.
      // pass login related information obtained from main.dart to AppRouterDelegate.
      routeInformationParser: RoutesInformationParser(),
      routerDelegate: AppRouterDelegate(isLoggedIn: widget.isLoggedIn),
    );
  }

  // initialize local properties.
  void _initializeProperties() {
    final SampleModel model = SampleModel.instance;
    model.isWebFullView =
        kIsWeb || Platform.isWindows || Platform.isMacOS || Platform.isLinux;
    if (kIsWeb) {
      model.isWeb = true;
    } else {
      model.isAndroid = Platform.isAndroid;
      model.isIOS = Platform.isIOS;
      model.isLinux = Platform.isLinux;
      model.isWindows = Platform.isWindows;
      model.isMacOS = Platform.isMacOS;
      model.isDesktop =
          Platform.isLinux || Platform.isMacOS || Platform.isWindows;
      model.isMobile = Platform.isAndroid || Platform.isIOS;
    }
  }
}
