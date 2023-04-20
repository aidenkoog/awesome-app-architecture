import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import 'package:flutter_web_navigation/presentation/theme/theme_model.dart';

import '../../../../../utils/theme_util.dart';

class ThemePaletteDrawerContainer extends StatefulWidget {
  final ThemeModel model;
  final double width;
  final Color textColor;
  const ThemePaletteDrawerContainer(
      {Key? key,
      required this.model,
      required this.width,
      required this.textColor})
      : super(key: key);

  @override
  State<ThemePaletteDrawerContainer> createState() =>
      _ThemePaletteDrawerContainerState();
}

class _ThemePaletteDrawerContainerState
    extends State<ThemePaletteDrawerContainer> {
  @override
  Widget build(BuildContext context) {
    return Container(
        color: widget.model.bottomSheetBackgroundColor,
        child: Column(children: <Widget>[
          const Padding(padding: EdgeInsets.only(top: 15)),
          Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Container(
                    padding: const EdgeInsets.only(top: 25, left: 10),
                    child: Text(themeSettingDrawerTitle,
                        style: TextStyle(
                            color: widget.model.textColor,
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            fontFamily: 'Roboto-Medium'))),
                IconButton(
                    icon: Icon(Icons.close, color: widget.model.webIconColor),
                    onPressed: () => Navigator.pop(context))
              ]),
          Expanded(
              child: ListView(children: <Widget>[
            Column(children: <Widget>[
              Padding(
                  padding: const EdgeInsets.fromLTRB(0, 20, 0, 0),
                  child: StatefulBuilder(
                      builder: (BuildContext context, StateSetter setState) {
                    return CupertinoSegmentedControl<int>(
                        children: <int, Widget>{
                          0: Container(
                              width: widget.width,
                              alignment: Alignment.center,
                              child: Text(themeSettingDrawerLightThemeText,
                                  style: TextStyle(
                                      color:
                                          widget.model.selectedThemeIndex == 0
                                              ? Colors.white
                                              : widget.textColor,
                                      fontFamily: 'Roboto-Medium'))),
                          1: Container(
                              width: widget.width,
                              alignment: Alignment.center,
                              child: Text(themeSettingDrawerDarkThemeText,
                                  style: TextStyle(
                                      color:
                                          widget.model.selectedThemeIndex == 1
                                              ? Colors.white
                                              : widget.textColor,
                                      fontFamily: 'Roboto-Medium')))
                        },
                        padding: const EdgeInsets.all(5),
                        unselectedColor: Colors.transparent,
                        selectedColor: widget.model.paletteColor,
                        pressedColor: widget.model.paletteColor,
                        borderColor: widget.model.paletteColor,
                        groupValue: widget.model.selectedThemeIndex,
                        onValueChanged: (int value) {
                          widget.model.selectedThemeIndex = value;
                          widget.model.currentThemeData = (value == 0)
                              ? ThemeData.from(
                                  colorScheme: const ColorScheme.light())
                              : ThemeData.from(
                                  colorScheme: const ColorScheme.dark());

                          setState(() {});
                        });
                  }))
            ]),
            Container(
                padding: const EdgeInsets.only(top: 25, left: 15),
                child: const Text(themeSettingDrawerColorsTitle,
                    style: TextStyle(
                        color: Color.fromRGBO(128, 128, 128, 1),
                        fontSize: 14,
                        fontFamily: 'Roboto-Regular'))),
            Container(
                padding: const EdgeInsets.fromLTRB(0, 25, 0, 0),
                child: Row(children: <Widget>[
                  Expanded(
                    child: Padding(
                        padding: const EdgeInsets.fromLTRB(15, 0, 10, 30),
                        child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children:
                                addColorPalettes(widget.model, setState))),
                  )
                ])),
            Container(
                height: 44,
                padding: const EdgeInsets.fromLTRB(15, 0, 15, 0),
                child: ElevatedButton(
                    style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all<Color>(
                            widget.model.paletteColor)),
                    onPressed: () => applyThemeAndPaletteColor(
                        widget.model, context, widget.model.selectedThemeIndex),
                    child: const Text(themeSettingDrawerApplyBtnText,
                        style: TextStyle(
                            fontSize: 16,
                            fontFamily: 'Roboto-Bold',
                            color: Colors.white))))
          ]))
        ]));
  }
}
