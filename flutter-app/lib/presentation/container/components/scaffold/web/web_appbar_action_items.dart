import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/theme/theme_model.dart';

import '../../../../../assets/strings/strings.dart';
import '../../../../components/context_menu/custom_popup_menu_button.dart';
import '../../navigation/web/web_nav_btn.dart';
import '../../navigation/web/web_nav_icon.dart';
import '../../navigation/web/web_nav_settings_icon.dart';
import '../../navigation/web/web_nav_text.dart';
import '../../popup_menu/popup_menu_items.dart';

typedef OnSelectNavItemCallback = void Function(String, Object?);

loadAppBarActionItems(BuildContext context, ThemeModel model,
    OnSelectNavItemCallback selectedNavItemCallback) {
  return <Widget>[
    NavigationItemButton(
        title: homeNavBtnTextMap[routeKeyCustomer],
        model: model,
        callback: () => selectedNavItemCallback(routeKeyCustomer, null)),
    NavigationItemButton(
        title: homeNavBtnTextMap[routeKeyInventory],
        model: model,
        callback: () => selectedNavItemCallback(routeKeyInventory, null)),
    NavigationItemButton(
        title: homeNavBtnTextMap[routeKeyAgency],
        model: model,
        callback: () => selectedNavItemCallback(routeKeyAgency, null)),
    NavigationItemButton(
        title: homeNavBtnTextMap[routeKeyAccounting],
        model: model,
        callback: () => selectedNavItemCallback(routeKeyAccounting, null)),
    NavigationItemButton(
        title: homeNavBtnTextMap[routeKeyEvents],
        model: model,
        callback: () => selectedNavItemCallback(routeKeyEvents, null)),
    NavigationItemButton(
        title: homeNavBtnTextMap[routeKeyQna],
        model: model,
        callback: () => selectedNavItemCallback(routeKeyQna, null)),
    NavigationItemText(model: model, text: homeLoginInfoText),
    CustomPopupMenuButton(
        popupMenuItemList: getPopupMenuItems(context),
        childWidget: NavigationItemIcon(
            model: model,
            icon:
                const Icon(Icons.supervised_user_circle, color: Colors.white)),
        onSelected: (menuIndex) =>
            selectedNavItemCallback(homeNavItemAccountIcon, menuIndex)),
    NavigationItemSettingsIcon(
        model: model,
        icon: const Icon(Icons.settings, color: Colors.white),
        callback: () => selectedNavItemCallback(homeNavItemSettings, null))
  ];
}
