import 'package:flutter/material.dart';

import '../../../../../assets/strings/strings.dart';
import '../../../../theme/theme_model.dart';
import 'mobile_nav_drawer_menu_item.dart';

typedef OnSelectMobileNavMenuCallback = void Function(String);

Widget getMobileNavMenuDrawer(
    ThemeModel model, OnSelectMobileNavMenuCallback callback) {
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
                child: Column(children: <Widget>[
                  Stack(children: <Widget>[
                    Container(
                        padding: const EdgeInsets.fromLTRB(10, 30, 30, 20),
                        child: Text(mobileNavDrawerTitle,
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                color: model.themeData.colorScheme.brightness ==
                                        Brightness.light
                                    ? Colors.black
                                    : Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 20)))
                  ]),
                  Expanded(
                      child: ListView(children: <Widget>[
                    SingleChildScrollView(
                        child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                          Padding(
                              padding: const EdgeInsets.fromLTRB(0, 0, 0, 10),
                              child: Text(mobileNavDrawerSubDescription,
                                  style: TextStyle(
                                      color: model.drawerTextIconColor,
                                      fontSize: 14,
                                      letterSpacing: 0.26,
                                      fontFamily: 'Roboto-Regular',
                                      fontWeight: FontWeight.normal)))
                        ])),
                    Padding(
                        padding: const EdgeInsets.fromLTRB(20, 20, 40, 0),
                        child: Container(
                            height: 2, width: 5, color: model.backgroundColor)),
                    Padding(
                        padding: const EdgeInsets.fromLTRB(0, 20, 3, 0),
                        child: Column(children: <Widget>[
                          Padding(
                              padding: const EdgeInsets.fromLTRB(15, 10, 0, 0),
                              child: Row(children: <Widget>[
                                Padding(
                                    padding:
                                        const EdgeInsets.fromLTRB(5, 0, 0, 0),
                                    child: Text(mobileNavDrawerNavMenuTitle,
                                        style: TextStyle(
                                            color: model.drawerTextIconColor,
                                            fontSize: 16,
                                            letterSpacing: 0.4,
                                            fontFamily: 'Roboto-Regular',
                                            fontWeight: FontWeight.bold)))
                              ])),
                          const Padding(
                              padding: EdgeInsets.fromLTRB(0, 15, 0, 0)),
                          MobileNavDrawerMenuItem(
                              model: model,
                              menuText: homeNavBtnTextMap[routeKeyCustomer],
                              callback: () => callback(routeKeyCustomer)),
                          MobileNavDrawerMenuItem(
                              model: model,
                              menuText: homeNavBtnTextMap[routeKeyInventory],
                              callback: () => callback(routeKeyInventory)),
                          MobileNavDrawerMenuItem(
                              model: model,
                              menuText: homeNavBtnTextMap[routeKeyAgency],
                              callback: () => callback(routeKeyAgency)),
                          MobileNavDrawerMenuItem(
                              model: model,
                              menuText: homeNavBtnTextMap[routeKeyAccounting],
                              callback: () => callback(routeKeyAccounting)),
                          MobileNavDrawerMenuItem(
                              model: model,
                              menuText: homeNavBtnTextMap[routeKeyEvents],
                              callback: () => callback(routeKeyEvents)),
                          MobileNavDrawerMenuItem(
                              model: model,
                              menuText: homeNavBtnTextMap[routeKeyQna],
                              callback: () => callback(routeKeyQna)),
                        ]))
                  ])),
                  Padding(
                      padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
                      child: Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: <Widget>[
                            Align(
                                alignment: Alignment.bottomCenter,
                                child: Text(mobileNavDrawerFooterAuthorText,
                                    style: TextStyle(
                                        color: model.themeData.colorScheme
                                                    .brightness ==
                                                Brightness.dark
                                            ? Colors.white
                                            : Colors.black,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20))),
                            Align(
                                alignment: Alignment.bottomCenter,
                                child: Text(mobileNavDrawerFooterVersionText,
                                    style: TextStyle(
                                        color: model.drawerTextIconColor,
                                        fontSize: 12,
                                        letterSpacing: 0.4,
                                        fontFamily: 'Roboto-Regular',
                                        fontWeight: FontWeight.normal)))
                          ]))
                ]))));
  });
}
