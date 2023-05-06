import 'package:flutter/material.dart';

import '../../../../theme/theme_model.dart';
import 'theme_palette_drawer.dart';

Widget showWebThemeSettings(ThemeModel model) {
  return StatefulBuilder(builder: (BuildContext context, StateSetter setState) {
    final double width = MediaQuery.of(context).size.width * 0.4;
    final Color textColor =
        model.themeData.colorScheme.brightness == Brightness.light
            ? const Color.fromRGBO(84, 84, 84, 1)
            : const Color.fromRGBO(218, 218, 218, 1);
    return Drawer(
        child: ThemePaletteDrawerContainer(
            model: model, width: width, textColor: textColor));
  });
}
