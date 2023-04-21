import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/values.dart';
import 'package:flutter_web_navigation/presentation/components/loading/custom_loading.dart';
import 'package:flutter_web_navigation/presentation/container/components/footer/footer_content.dart';
import 'package:flutter_web_navigation/utils/auth_util.dart';
import 'package:flutter_web_navigation/utils/html_util.dart';

import '../../../../../assets/strings/strings.dart';
import '../../../../theme/theme_model.dart';
import '../../../../../utils/navigation_util.dart';
import '../../../../components/context_menu/custom_popup_menu_button.dart';
import '../../drawer/palette/theme_setting_builder.dart';
import '../../main/main_content_card.dart';
import '../../navigation/web/web_nav_btn.dart';
import '../../navigation/web/web_nav_icon.dart';
import '../../navigation/web/web_nav_settings_icon.dart';
import '../../navigation/web/web_nav_text.dart';
import '../../navigation/web/web_nav_title.dart';
import '../../popup_menu/popup_menu_items.dart';

class HomeWebScaffold extends StatefulWidget {
  final GlobalKey<ScaffoldState> scaffoldKey;
  final ThemeModel model;
  final ScrollController controller;

  const HomeWebScaffold(
      {Key? key,
      required this.scaffoldKey,
      required this.model,
      required this.controller})
      : super(key: key);

  @override
  State<StatefulWidget> createState() => _HomeWebScaffoldState();
}

class _HomeWebScaffoldState extends State<HomeWebScaffold> {
  Widget? render;
  bool isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        bottomNavigationBar: Footer(model: widget.model),
        key: widget.scaffoldKey,
        backgroundColor: widget.model.webBackgroundColor,
        endDrawerEnableOpenDragGesture: false,
        endDrawer: showWebThemeSettings(widget.model),
        resizeToAvoidBottomInset: false,
        appBar: PreferredSize(
            preferredSize: const Size.fromHeight(90.0),
            child: AppBar(
                leading: Container(),
                elevation: 0.0,
                backgroundColor: widget.model.paletteColor,
                flexibleSpace: loadAppBarTitle(),
                actions: loadAppBarActionItems())),
        body: isLoading
            ? CustomLoading(
                loadingBarColor: widget.model.paletteColor,
                textColor: widget.model.paletteColor)
            : const MainContentCard());
  }

  loadAppBarTitle() {
    return NavigationTitle(
        model: widget.model,
        title: homeTitle,
        subDescription: homeSubDescription,
        callback: () => reloadWebpage());
  }

  loadAppBarActionItems() {
    return <Widget>[
      NavigationItemButton(
          title: homeNavBtnTextMap[routeKeyCustomer],
          model: widget.model,
          callback: () => navigateWithDelay(routeKeyCustomer)),
      NavigationItemButton(
          title: homeNavBtnTextMap[routeKeyInventory],
          model: widget.model,
          callback: () => navigateWithDelay(routeKeyInventory)),
      NavigationItemButton(
          title: homeNavBtnTextMap[routeKeyAgency],
          model: widget.model,
          callback: () => navigateWithDelay(routeKeyAgency)),
      NavigationItemButton(
          title: homeNavBtnTextMap[routeKeyAccounting],
          model: widget.model,
          callback: () => navigateWithDelay(routeKeyAccounting)),
      NavigationItemButton(
          title: homeNavBtnTextMap[routeKeyEvents],
          model: widget.model,
          callback: () => navigateWithDelay(routeKeyEvents)),
      NavigationItemButton(
          title: homeNavBtnTextMap[routeKeyQna],
          model: widget.model,
          callback: () => navigateWithDelay(routeKeyQna)),
      NavigationItemText(model: widget.model, text: homeLoginInfoText),
      CustomPopupMenuButton(
          popupMenuItemList: getPopupMenuItems(context),
          childWidget: NavigationItemIcon(
              model: widget.model,
              icon: const Icon(Icons.supervised_user_circle,
                  color: Colors.white)),
          onSelected: (value) {
            switch (value) {
              case popupMenuItemLogoutIndex:
                setState(() => isLoading = true);
                signOut((signOutCompleted) {
                  setState(() => isLoading = !signOutCompleted);
                  signOutCompleted ? navigateByLogout() : {};
                });
                break;
            }
          }),
      NavigationItemSettingsIcon(
          model: widget.model,
          icon: const Icon(Icons.settings, color: Colors.white),
          callback: () => widget.scaffoldKey.currentState!.openEndDrawer())
    ];
  }
}
