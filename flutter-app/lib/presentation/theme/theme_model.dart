import 'dart:io' show Platform;
import 'package:desktop_window/desktop_window.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class ThemeModel extends Listenable {
  static ThemeModel instance = ThemeModel();

  ThemeData? currentThemeData;
  late ThemeData themeData;
  late List<Color>? paletteColors;
  late List<Color>? paletteBorderColors;
  late List<Color>? darkPaletteColors;
  late bool isMobileResolution;

  Color backgroundColor = const Color.fromRGBO(0, 116, 227, 1);
  Color paletteColor = const Color.fromRGBO(0, 116, 227, 1);
  Color currentPrimaryColor = const Color.fromRGBO(0, 116, 227, 1);
  Color textColor = const Color.fromRGBO(51, 51, 51, 1);
  Color drawerTextIconColor = Colors.black;
  Color bottomSheetBackgroundColor = Colors.white;
  Color cardThemeColor = Colors.white;
  Color webBackgroundColor = const Color.fromRGBO(246, 246, 246, 1);
  Color webIconColor = const Color.fromRGBO(0, 0, 0, 0.54);
  Color webInputColor = const Color.fromRGBO(242, 242, 242, 1);
  Color webOutputContainerColor = Colors.white;
  Color cardColor = Colors.white;
  Color dividerColor = const Color.fromRGBO(204, 204, 204, 1);
  Color currentPaletteColor = const Color.fromRGBO(0, 116, 227, 1);

  bool isWeb = false;
  bool isWebFullView = false;

  bool isMobile = false;
  bool isDesktop = false;
  bool isAndroid = false;
  bool isWindows = false;
  bool isIOS = false;
  bool isLinux = false;
  bool isMacOS = false;

  int selectedThemeIndex = 0;

  void changeTheme(ThemeData currentThemeData) {
    themeData = currentThemeData;
    switch (currentThemeData.colorScheme.brightness) {
      case Brightness.dark:
        dividerColor = const Color.fromRGBO(61, 61, 61, 1);
        cardColor = const Color.fromRGBO(48, 48, 48, 1);
        webIconColor = const Color.fromRGBO(255, 255, 255, 0.65);
        webOutputContainerColor = const Color.fromRGBO(23, 23, 23, 1);
        webInputColor = const Color.fromRGBO(44, 44, 44, 1);
        webBackgroundColor = const Color.fromRGBO(33, 33, 33, 1);
        drawerTextIconColor = Colors.white;
        bottomSheetBackgroundColor = const Color.fromRGBO(34, 39, 51, 1);
        textColor = const Color.fromRGBO(242, 242, 242, 1);
        cardThemeColor = const Color.fromRGBO(33, 33, 33, 1);
        break;

      default:
        dividerColor = const Color.fromRGBO(204, 204, 204, 1);
        cardColor = Colors.white;
        webIconColor = const Color.fromRGBO(0, 0, 0, 0.54);
        webOutputContainerColor = Colors.white;
        webInputColor = const Color.fromRGBO(242, 242, 242, 1);
        webBackgroundColor = const Color.fromRGBO(246, 246, 246, 1);
        drawerTextIconColor = Colors.black;
        bottomSheetBackgroundColor = Colors.white;
        textColor = const Color.fromRGBO(51, 51, 51, 1);
        cardThemeColor = Colors.white;
    }
  }

  void initializeProperties() {
    final ThemeModel model = ThemeModel.instance;
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

  void setupPaletteColors() {
    paletteColors = <Color>[
      const Color.fromRGBO(0, 116, 227, 1),
      const Color.fromRGBO(230, 74, 25, 1),
      const Color.fromRGBO(216, 27, 96, 1),
      const Color.fromRGBO(103, 58, 184, 1),
      const Color.fromRGBO(2, 137, 123, 1)
    ];
    darkPaletteColors = <Color>[
      const Color.fromRGBO(68, 138, 255, 1),
      const Color.fromRGBO(255, 110, 64, 1),
      const Color.fromRGBO(238, 79, 132, 1),
      const Color.fromRGBO(180, 137, 255, 1),
      const Color.fromRGBO(29, 233, 182, 1)
    ];
    paletteBorderColors = <Color>[
      const Color.fromRGBO(0, 116, 227, 1),
      Colors.transparent,
      Colors.transparent,
      Colors.transparent,
      Colors.transparent
    ];
  }

  final Set<VoidCallback> _listeners = <VoidCallback>{};

  @override
  void addListener(VoidCallback listener) => _listeners.add(listener);

  @override
  void removeListener(VoidCallback listener) => _listeners.remove(listener);

  void notifyListeners() =>
      _listeners.toList().forEach((VoidCallback listener) => listener());
}

Future<void> setupWindowSize() async {
  if (!kIsWeb && (Platform.isWindows || Platform.isLinux || Platform.isMacOS)) {
    await DesktopWindow.setMinWindowSize(const Size(775, 230));
  }
}
