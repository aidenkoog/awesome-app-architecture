import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import 'model.dart';

void onTapControlInMobile(BuildContext context, SampleModel model,
    WidgetCategory category, int position) {}

void onTapControlInWeb(BuildContext context, SampleModel model,
    WidgetCategory category, int position) {
  category.selectedIndex = position;
  final SubItem subItem =
      category.controlList![category.selectedIndex!].subItems[0].type ==
              'parent'
          ? category.controlList![category.selectedIndex!].subItems[0]
              .subItems[0].subItems[0] as SubItem
          : category.controlList![category.selectedIndex!].subItems[0].type ==
                  'child'
              ? category.controlList![category.selectedIndex!].subItems[0]
                  .subItems[0] as SubItem
              : category.controlList![category.selectedIndex!].subItems[0]
                  as SubItem;

  Navigator.pushNamed(context, subItem.breadCrumbText!);
}

Widget getLeftSideDrawer(SampleModel model) {
  return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
    return SizedBox(
        width: MediaQuery.of(context).size.width *
            (MediaQuery.of(context).size.width < 600 ? 0.7 : 0.4),
        child: Drawer(
            child: Container(
          color: model.themeData.colorScheme.brightness == Brightness.dark
              ? Colors.black
              : Colors.white,
          child: Column(
            children: <Widget>[
              Stack(children: <Widget>[
                Container(
                  padding: const EdgeInsets.fromLTRB(10, 30, 30, 20),
                  child: Text(
                    'Admin System by AidenKooG',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        color: model.themeData.colorScheme.brightness ==
                                Brightness.light
                            ? Colors.black
                            : Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 20),
                  ),
                )
              ]),
              Expanded(
                /// ListView contains a group of widgets
                /// that scroll inside the drawer
                child: ListView(
                  children: <Widget>[
                    SingleChildScrollView(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Padding(
                            padding: const EdgeInsets.fromLTRB(0, 0, 0, 10),
                            child: Text('Portal . Debugging version',
                                style: TextStyle(
                                    color: model.drawerTextIconColor,
                                    fontSize: 14,
                                    letterSpacing: 0.26,
                                    fontFamily: 'Roboto-Regular',
                                    fontWeight: FontWeight.normal)),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 20, 40, 0),
                      child: Container(
                          height: 2, width: 5, color: model.backgroundColor),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0, 20, 3, 0),
                      child: Column(
                        children: <Widget>[
                          Padding(
                            padding: const EdgeInsets.fromLTRB(15, 10, 0, 0),
                            child: Row(children: <Widget>[
                              Padding(
                                padding: const EdgeInsets.fromLTRB(5, 0, 0, 0),
                                child: Text('Menu',
                                    style: TextStyle(
                                        color: model.drawerTextIconColor,
                                        fontSize: 16,
                                        letterSpacing: 0.4,
                                        fontFamily: 'Roboto-Regular',
                                        fontWeight: FontWeight.bold)),
                              )
                            ]),
                          ),
                          const Padding(
                              padding: EdgeInsets.fromLTRB(0, 15, 0, 0)),
                          Material(
                              color: Colors.transparent,
                              child: InkWell(
                                  splashColor: Colors.grey.withOpacity(0.4),
                                  onTap: () {
                                    Feedback.forLongPress(context);
                                  },
                                  child: Column(
                                    children: <Widget>[
                                      const Padding(
                                          padding: EdgeInsets.only(top: 10)),
                                      Row(
                                        children: <Widget>[
                                          Padding(
                                            padding: const EdgeInsets.fromLTRB(
                                                15, 0, 0, 0),
                                            child: Icon(Icons.settings,
                                                color: model.backgroundColor),
                                          ),
                                          Container(
                                              padding:
                                                  const EdgeInsets.fromLTRB(
                                                      10, 0, 0, 0),
                                              child: Text('CUSTOMER',
                                                  style: TextStyle(
                                                      color: model
                                                          .drawerTextIconColor,
                                                      fontSize: 16,
                                                      letterSpacing: 0.4,
                                                      fontFamily:
                                                          'Roboto-Regular',
                                                      fontWeight:
                                                          FontWeight.normal))),
                                          const Spacer(),
                                        ],
                                      ),
                                      const Padding(
                                          padding: EdgeInsets.only(top: 10)),
                                    ],
                                  ))),
                          Material(
                              color: Colors.transparent,
                              child: InkWell(
                                  splashColor: Colors.grey.withOpacity(0.4),
                                  onTap: () {
                                    Feedback.forLongPress(context);
                                  },
                                  child: Column(
                                    children: <Widget>[
                                      const Padding(
                                          padding: EdgeInsets.only(top: 10)),
                                      Row(
                                        children: <Widget>[
                                          Padding(
                                            padding: const EdgeInsets.fromLTRB(
                                                15, 0, 0, 0),
                                            child: Icon(Icons.settings,
                                                color: model.backgroundColor),
                                          ),
                                          Container(
                                            padding: const EdgeInsets.fromLTRB(
                                                10, 0, 0, 0),
                                            child: Text('INVENTORY',
                                                style: TextStyle(
                                                    color: model
                                                        .drawerTextIconColor,
                                                    fontSize: 16,
                                                    letterSpacing: 0.4,
                                                    fontFamily:
                                                        'Roboto-Regular',
                                                    fontWeight:
                                                        FontWeight.normal)),
                                          ),
                                          const Spacer(),
                                        ],
                                      ),
                                      const Padding(
                                          padding: EdgeInsets.only(top: 10)),
                                    ],
                                  ))),
                          Material(
                              color: Colors.transparent,
                              child: InkWell(
                                  splashColor: Colors.grey.withOpacity(0.4),
                                  onTap: () {
                                    Feedback.forLongPress(context);
                                  },
                                  child: Column(
                                    children: <Widget>[
                                      const Padding(
                                          padding: EdgeInsets.only(top: 10)),
                                      Row(
                                        children: <Widget>[
                                          Padding(
                                            padding: const EdgeInsets.fromLTRB(
                                                15, 0, 0, 0),
                                            child: Icon(Icons.settings,
                                                color: model.backgroundColor),
                                          ),
                                          Container(
                                            padding: const EdgeInsets.fromLTRB(
                                                10, 0, 0, 0),
                                            child: Text('AGENCY',
                                                style: TextStyle(
                                                    color: model
                                                        .drawerTextIconColor,
                                                    fontSize: 16,
                                                    letterSpacing: 0.4,
                                                    fontFamily:
                                                        'Roboto-Regular',
                                                    fontWeight:
                                                        FontWeight.normal)),
                                          ),
                                          const Spacer(),
                                        ],
                                      ),
                                      const Padding(
                                          padding: EdgeInsets.only(top: 10)),
                                    ],
                                  ))),
                          Material(
                              color: Colors.transparent,
                              child: InkWell(
                                  splashColor: Colors.grey.withOpacity(0.4),
                                  onTap: () {
                                    Feedback.forLongPress(context);
                                  },
                                  child: Column(
                                    children: <Widget>[
                                      const Padding(
                                          padding: EdgeInsets.only(top: 10)),
                                      Row(
                                        children: <Widget>[
                                          Padding(
                                            padding: const EdgeInsets.fromLTRB(
                                                15, 0, 0, 0),
                                            child: Icon(Icons.settings,
                                                color: model.backgroundColor),
                                          ),
                                          Container(
                                            padding: const EdgeInsets.fromLTRB(
                                                10, 0, 0, 0),
                                            child: Text('ACCOUNTING',
                                                style: TextStyle(
                                                    color: model
                                                        .drawerTextIconColor,
                                                    fontSize: 16,
                                                    letterSpacing: 0.4,
                                                    fontFamily:
                                                        'Roboto-Regular',
                                                    fontWeight:
                                                        FontWeight.normal)),
                                          ),
                                          const Spacer(),
                                        ],
                                      ),
                                      const Padding(
                                          padding: EdgeInsets.only(top: 10)),
                                    ],
                                  ))),
                          Material(
                              color: Colors.transparent,
                              child: InkWell(
                                  splashColor: Colors.grey.withOpacity(0.4),
                                  onTap: () {
                                    Feedback.forLongPress(context);
                                  },
                                  child: Column(
                                    children: <Widget>[
                                      const Padding(
                                          padding: EdgeInsets.only(top: 10)),
                                      Row(
                                        children: <Widget>[
                                          Padding(
                                            padding: const EdgeInsets.fromLTRB(
                                                15, 0, 0, 0),
                                            child: Icon(Icons.settings,
                                                color: model.backgroundColor),
                                          ),
                                          Container(
                                            padding: const EdgeInsets.fromLTRB(
                                                10, 0, 0, 0),
                                            child: Text('EVENTS',
                                                style: TextStyle(
                                                    color: model
                                                        .drawerTextIconColor,
                                                    fontSize: 16,
                                                    letterSpacing: 0.4,
                                                    fontFamily:
                                                        'Roboto-Regular',
                                                    fontWeight:
                                                        FontWeight.normal)),
                                          ),
                                          const Spacer(),
                                        ],
                                      ),
                                      const Padding(
                                          padding: EdgeInsets.only(top: 10)),
                                    ],
                                  ))),
                          Material(
                              color: Colors.transparent,
                              child: InkWell(
                                  splashColor: Colors.grey.withOpacity(0.4),
                                  onTap: () {
                                    Feedback.forLongPress(context);
                                  },
                                  child: Column(
                                    children: <Widget>[
                                      const Padding(
                                          padding: EdgeInsets.only(top: 10)),
                                      Row(
                                        children: <Widget>[
                                          Padding(
                                            padding: const EdgeInsets.fromLTRB(
                                                15, 0, 0, 0),
                                            child: Icon(Icons.settings,
                                                color: model.backgroundColor),
                                          ),
                                          Container(
                                            padding: const EdgeInsets.fromLTRB(
                                                10, 0, 0, 0),
                                            child: Text('Q&A',
                                                style: TextStyle(
                                                    color: model
                                                        .drawerTextIconColor,
                                                    fontSize: 16,
                                                    letterSpacing: 0.4,
                                                    fontFamily:
                                                        'Roboto-Regular',
                                                    fontWeight:
                                                        FontWeight.normal)),
                                          ),
                                          const Spacer(),
                                        ],
                                      ),
                                      const Padding(
                                          padding: EdgeInsets.only(top: 10)),
                                    ],
                                  ))),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: <Widget>[
                    Align(
                        alignment: Alignment.bottomCenter,
                        child: Text(
                          'AidenKooG',
                          style: TextStyle(
                              color: model.themeData.colorScheme.brightness ==
                                      Brightness.dark
                                  ? Colors.white
                                  : Colors.black,
                              fontWeight: FontWeight.bold,
                              fontSize: 20),
                        )),
                    Align(
                        alignment: Alignment.bottomCenter,
                        child: Text('Version 1.0.0',
                            style: TextStyle(
                                color: model.drawerTextIconColor,
                                fontSize: 12,
                                letterSpacing: 0.4,
                                fontFamily: 'Roboto-Regular',
                                fontWeight: FontWeight.normal)))
                  ],
                ),
              ),
            ],
          ),
        )));
  });
}

Widget getFooter(BuildContext context, SampleModel model) {
  return Container(
    height: 60,
    decoration: BoxDecoration(
      border: Border(
        top: BorderSide(width: 0.8, color: model.dividerColor),
      ),
      color: model.themeData.colorScheme.brightness == Brightness.dark
          ? const Color.fromRGBO(33, 33, 33, 1)
          : const Color.fromRGBO(234, 234, 234, 1),
    ),
    padding: model.isMobileResolution
        ? EdgeInsets.fromLTRB(MediaQuery.of(context).size.width * 0.025, 0,
            MediaQuery.of(context).size.width * 0.025, 0)
        : EdgeInsets.fromLTRB(MediaQuery.of(context).size.width * 0.05, 0,
            MediaQuery.of(context).size.width * 0.05, 0),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: <Widget>[
        Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Row(
              children: <Widget>[
                InkWell(
                  onTap: () =>
                      launchUrl(Uri.parse('https://aidenkoog.github.io/')),
                  child: const Text('AidenKooG website',
                      style: TextStyle(color: Colors.blue, fontSize: 12)),
                ),
                Text(' | ',
                    style: TextStyle(
                        fontSize: 12, color: model.textColor.withOpacity(0.7))),
                InkWell(
                  onTap: () =>
                      launchUrl(Uri.parse('https://github.com/aidenkoog/')),
                  child: const Text('GitHub',
                      style: TextStyle(color: Colors.blue, fontSize: 12)),
                ),
              ],
            ),
            Container(
                padding: const EdgeInsets.only(top: 10),
                child: Text('Copyright © 2023 AidenKooG.',
                    style: TextStyle(
                        color: model.textColor.withOpacity(0.7),
                        fontSize: 12,
                        letterSpacing: 0.23)))
          ],
        ),
        InkWell(
            onTap: () => launchUrl(Uri.parse('https://aidenkoog.github.io/')),
            child: Text(
              'AidenKooG',
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 17,
                  color:
                      model.themeData.colorScheme.brightness == Brightness.dark
                          ? Colors.white
                          : Colors.black),
            )),
      ],
    ),
  );
}

/// Show Right drawer which contains theme settings for web.
Widget showWebThemeSettings(SampleModel model) {
  int selectedValue = model.selectedThemeIndex;
  return StatefulBuilder(builder: (BuildContext context, StateSetter setState) {
    final double width = MediaQuery.of(context).size.width * 0.4;
    final Color textColor =
        model.themeData.colorScheme.brightness == Brightness.light
            ? const Color.fromRGBO(84, 84, 84, 1)
            : const Color.fromRGBO(218, 218, 218, 1);
    return Drawer(
        child: Container(
            color: model.bottomSheetBackgroundColor,
            child: Column(
              children: <Widget>[
                const Padding(
                  padding: EdgeInsets.only(top: 15),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Text('   Settings',
                        style: TextStyle(
                            color: model.textColor,
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            fontFamily: 'Roboto-Medium')),
                    IconButton(
                        icon: Icon(Icons.close, color: model.webIconColor),
                        onPressed: () {
                          Navigator.pop(context);
                        }),
                  ],
                ),
                Expanded(
                  child: ListView(
                    children: <Widget>[
                      Column(children: <Widget>[
                        Padding(
                            padding: const EdgeInsets.fromLTRB(0, 20, 0, 0),
                            child: StatefulBuilder(builder:
                                (BuildContext context, StateSetter setState) {
                              return CupertinoSegmentedControl<int>(
                                children: <int, Widget>{
                                  0: Container(
                                      width: width,
                                      alignment: Alignment.center,
                                      child: Text('Light theme',
                                          style: TextStyle(
                                              color: selectedValue == 0
                                                  ? Colors.white
                                                  : textColor,
                                              fontFamily: 'Roboto-Medium'))),
                                  1: Container(
                                      width: width,
                                      alignment: Alignment.center,
                                      child: Text('Dark theme',
                                          style: TextStyle(
                                              color: selectedValue == 1
                                                  ? Colors.white
                                                  : textColor,
                                              fontFamily: 'Roboto-Medium')))
                                },
                                padding: const EdgeInsets.all(5),
                                unselectedColor: Colors.transparent,
                                selectedColor: model.paletteColor,
                                pressedColor: model.paletteColor,
                                borderColor: model.paletteColor,
                                groupValue: selectedValue,
                                onValueChanged: (int value) {
                                  selectedValue = value;
                                  model.currentThemeData = (value == 0)
                                      ? ThemeData.from(
                                          colorScheme:
                                              const ColorScheme.light())
                                      : ThemeData.from(
                                          colorScheme:
                                              const ColorScheme.dark());

                                  setState(() {
                                    /// update the theme changes
                                    /// tp [CupertinoSegmentedControl]
                                  });
                                },
                              );
                            }))
                      ]),
                      Container(
                          padding: const EdgeInsets.only(top: 25, left: 15),
                          child: const Text(
                            'Theme colors',
                            style: TextStyle(
                                color: Color.fromRGBO(128, 128, 128, 1),
                                fontSize: 14,
                                fontFamily: 'Roboto-Regular'),
                          )),
                      Container(
                          padding: const EdgeInsets.fromLTRB(0, 25, 0, 0),
                          child: Row(
                            children: <Widget>[
                              Expanded(
                                child: Padding(
                                  padding:
                                      const EdgeInsets.fromLTRB(15, 0, 10, 30),
                                  child: Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children:
                                          _addColorPalettes(model, setState)),
                                ),
                              ),
                            ],
                          )),
                      Container(
                        height: 44,
                        padding: const EdgeInsets.fromLTRB(15, 0, 15, 0),
                        child: ElevatedButton(
                            style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(
                                  model.paletteColor),
                            ),
                            onPressed: () => _applyThemeAndPaletteColor(
                                model, context, selectedValue),
                            child: const Text('APPLY',
                                style: TextStyle(
                                    fontSize: 16,
                                    fontFamily: 'Roboto-Bold',
                                    color: Colors.white))),
                      )
                    ],
                  ),
                ),
              ],
            )));
  });
}

void _applyThemeAndPaletteColor(
    SampleModel model, BuildContext context, int selectedValue) {
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

List<Widget> _addColorPalettes(SampleModel model, [StateSetter? setState]) {
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
            onTap: () => _changeColorPalette(model, i, setState),
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

/// Changing the palete color of the application.
void _changeColorPalette(SampleModel model, int index,
    [StateSetter? setState]) {
  for (int j = 0; j < model.paletteBorderColors!.length; j++) {
    model.paletteBorderColors![j] = Colors.transparent;
  }
  model.paletteBorderColors![index] = model.paletteColors![index];
  model.currentPaletteColor = model.paletteColors![index];
  model.currentPrimaryColor = model.darkPaletteColors![index];

  model.isWebFullView ? setState!(() {}) : model.notifyListeners();
}
