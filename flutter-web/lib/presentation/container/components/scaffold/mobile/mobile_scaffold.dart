import 'dart:async';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/values.dart';
import 'package:flutter_web_navigation/presentation/container/components/navigation/mobile/mobile_nav_opacity_title.dart';
import 'package:flutter_web_navigation/presentation/container/components/navigation/mobile/mobile_nav_settings_icon.dart';
import 'package:flutter_web_navigation/utils/drawer_util.dart';

import '../../../../../assets/strings/strings.dart';
import '../../../../../routes/route_delegate.dart';
import '../../../../../routes/route_handler.dart';
import '../../../../components/context_menu/custom_popup_menu_button.dart';
import '../../../../components/loading/custom_loading.dart';
import '../../../../theme/theme_model.dart';
import '../../../../../utils/auth_util.dart';
import '../../../../../utils/navigation_util.dart';
import '../../drawer/palette/theme_setting_builder.dart';
import '../../navigation/mobile/mobile_nav_drawer.dart';
import '../../navigation/mobile/mobile_nav_icon.dart';
import '../../popup_menu/popup_menu_items.dart';

class HomeMobileScaffold extends StatefulWidget {
  final String routeName;
  final GlobalKey<ScaffoldState> scaffoldKey;
  final ThemeModel model;
  final ScrollController controller;

  const HomeMobileScaffold(
      {Key? key,
      required this.scaffoldKey,
      required this.model,
      required this.controller,
      required this.routeName})
      : super(key: key);

  @override
  State<StatefulWidget> createState() => _HomeMobileScaffoldState();
}

class _HomeMobileScaffoldState extends State<HomeMobileScaffold> {
  Widget? render;
  bool isLoading = false;
  Timer? tabNavTimer;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        drawer: (!widget.model.isWebFullView && Platform.isIOS)
            ? null
            : getMobileNavMenuDrawer(widget.model, handleNavMenuSelectEvent),
        key: widget.scaffoldKey,
        backgroundColor: widget.model.webBackgroundColor,
        endDrawerEnableOpenDragGesture: false,
        endDrawer: widget.model.isWebFullView
            ? showWebThemeSettings(widget.model)
            : null,
        appBar: PreferredSize(
            preferredSize: const Size.fromHeight(46.0),
            child: AppBar(
                leading: (!widget.model.isWebFullView && Platform.isIOS)
                    ? Container()
                    : null,
                elevation: 0.0,
                backgroundColor: widget.model.paletteColor,
                title: MobileNavOpacityTitle(
                    controller: widget.controller,
                    opacity: 0,
                    child: const Text(homeTitle,
                        style: TextStyle(
                            fontSize: 18, fontFamily: 'HeeboMedium'))),
                actions: <Widget>[
                  Row(children: [
                    CustomPopupMenuButton(
                        popupMenuItemList: getPopupMenuItems(context),
                        childWidget: const MobileNavigationIcon(
                            icon: Icon(Icons.supervised_user_circle,
                                color: Colors.white)),
                        onSelected: (menuIndex) =>
                            handleAccountMenuEvent(menuIndex)),
                    MobileNavSettingsIcon(scaffoldKey: widget.scaffoldKey)
                  ])
                ])),
        body: isLoading
            ? CustomLoading(
                loadingBarColor: widget.model.paletteColor,
                textColor: widget.model.paletteColor)
            : RouteHandler().getRouteWidget(
                widget.routeName, widget.scaffoldKey, widget.controller));
  }

  void handleNavMenuSelectEvent(String navItem) {
    switch (navItem) {
      case routeKeyCustomer:
      case routeKeyInventory:
      case routeKeyAgency:
      case routeKeyAccounting:
      case routeKeyEvents:
      case routeKeyQna:
        closeDrawerUi(widget.scaffoldKey);
        setState(() => isLoading = true);
        if (tabNavTimer != null) {
          tabNavTimer!.cancel();
        }
        tabNavTimer =
            Timer(const Duration(milliseconds: mainNavTabNavigationDelayTime),
                () async {
          setState(() => isLoading = false);
          AppRouterDelegate().setPathName(navItem);
        });
        break;
      default:
    }
  }

  void handleAccountMenuEvent(menuIndex) {
    if (menuIndex == null) return;
    if (menuIndex is! int) return;
    switch (menuIndex) {
      case popupMenuItemLogoutIndex:
        setState(() => isLoading = true);
        signOut((signOutCompleted) {
          setState(() => isLoading = !signOutCompleted);
          signOutCompleted ? navigateByLogout() : {};
        });
        break;
    }
  }
}
