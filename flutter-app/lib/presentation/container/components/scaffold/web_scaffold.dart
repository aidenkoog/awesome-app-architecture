// ignore_for_file: overridden_fields
import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/container/components/navigation/web/navigation_item_button.dart';
import 'package:flutter_web_navigation/presentation/container/components/navigation/web/navigation_item_icon.dart';
import 'package:flutter_web_navigation/presentation/container/components/navigation/web/navigation_item_settings_icon.dart';
import 'package:flutter_web_navigation/presentation/container/components/navigation/web/navigation_item_text.dart';
import 'package:flutter_web_navigation/presentation/container/components/navigation/web/navigation_title.dart';
// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;

import '../../../../temp/helper.dart';
import '../../../../temp/model.dart';
import '../../../../utils/log_util.dart';
import '../../../components/context_menu/custom_popup_menu_button.dart';
import '../popup_menu/popup_menu_items.dart';
import 'base_scaffold.dart';

class HomeWebScaffold extends HomeBaseScaffold {
  @override
  final GlobalKey<ScaffoldState> scaffoldKey;
  @override
  final SampleModel model;
  @override
  final ScrollController controller;
  @override
  final String currentSelectedItemButton;

  const HomeWebScaffold(this.scaffoldKey, this.model, this.controller,
      this.currentSelectedItemButton, {Key? key})
      : super(
            key: key,
            scaffoldKey: scaffoldKey,
            model: model,
            controller: controller,
            currentSelectedItemButton: currentSelectedItemButton);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        bottomNavigationBar: getFooter(context, model),
        key: scaffoldKey,
        backgroundColor: model.webBackgroundColor,
        endDrawerEnableOpenDragGesture: false,
        endDrawer: showWebThemeSettings(model),
        resizeToAvoidBottomInset: false,

        // app bar.
        appBar: PreferredSize(
            preferredSize: const Size.fromHeight(90.0),
            child: AppBar(
              leading: Container(),
              elevation: 0.0,
              backgroundColor: model.paletteColor,

              // navigation title.
              flexibleSpace: NavigationTitle(
                model: model,
                subDescription: 'Portal . Debugging version',
                title: 'Aiden System by AidenKooG',
                callback: () {
                  html.window.location.reload();
                },
              ),

              // navigation button, text and icons.
              actions: <Widget>[
                // customer.
                NavigationItemButton(
                  title: 'CUSTOMER',
                  model: model,
                  onTabCallack: () {},
                ),

                // inventory.
                NavigationItemButton(
                  title: 'INVENTORY',
                  model: model,
                  onTabCallack: () {},
                ),

                // agency.
                NavigationItemButton(
                  title: 'AGENCY',
                  model: model,
                  onTabCallack: () {},
                ),

                // accounting.
                NavigationItemButton(
                  title: 'ACCOUNTING',
                  model: model,
                  onTabCallack: () {},
                ),

                // events.
                NavigationItemButton(
                  title: 'EVENTS',
                  model: model,
                  onTabCallack: () {},
                ),

                // Q&A
                NavigationItemButton(
                  title: 'Q&A',
                  model: model,
                  onTabCallack: () {},
                ),

                // logout information text.
                NavigationItemText(model: model, text: 'Logout: 100H 59H 59S'),

                // user account icon.
                CustomPopupMenuButton(
                  popupMenuItemList: getPopupMenuItems(context),
                  childWidget: NavigationItemIcon(
                      model: model,
                      icon: const Icon(Icons.supervised_user_circle,
                          color: Colors.white)),
                  onSelected: (Object? value) {
                    logd("debug", "selected popup menu item value: $value");
                    onHandlePopupMenuItemEvent(value);
                  },
                ),

                // settings icon.
                NavigationItemSettingsIcon(
                    model: model,
                    icon: const Icon(Icons.settings, color: Colors.white),
                    onPressIconCallack: () {
                      scaffoldKey.currentState!.openEndDrawer();
                    }),
              ],
            )),

        // body content.
        body: const CategorizedCards());
  }

  // handler for popup menu events.
  onHandlePopupMenuItemEvent(Object? value) {
    int selectedItemValue = value as int;
    switch (selectedItemValue) {
      case 3:
        break;
      default:
        break;
    }
  }
}
