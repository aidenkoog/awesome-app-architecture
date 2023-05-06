import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/values.dart';
import 'package:flutter_web_navigation/presentation/components/loading/custom_loading.dart';
import 'package:flutter_web_navigation/presentation/container/components/footer/footer_content.dart';
import 'package:flutter_web_navigation/routes/route_delegate.dart';
import 'package:flutter_web_navigation/routes/route_handler.dart';
import 'package:flutter_web_navigation/utils/auth_util.dart';
import 'package:flutter_web_navigation/utils/html_util.dart';

import '../../../../../assets/strings/strings.dart';
import '../../../../theme/theme_model.dart';
import '../../../../../utils/navigation_util.dart';
import '../../drawer/palette/theme_setting_builder.dart';
import '../../navigation/web/web_nav_title.dart';
import 'web_appbar_action_items.dart';

class HomeWebScaffold extends StatefulWidget {
  final String routeName;
  final GlobalKey<ScaffoldState> scaffoldKey;
  final ThemeModel model;
  final ScrollController controller;

  const HomeWebScaffold(
      {Key? key,
      required this.scaffoldKey,
      required this.model,
      required this.controller,
      required this.routeName})
      : super(key: key);

  @override
  State<StatefulWidget> createState() => _HomeWebScaffoldState();
}

class _HomeWebScaffoldState extends State<HomeWebScaffold> {
  Widget? render;
  bool isLoading = false;
  Timer? tabNavTimer;

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
                actions: loadAppBarActionItems(
                    context,
                    widget.model,
                    (navItem, extras) =>
                        handleNavItemSelectEvent(navItem, extras)))),
        body: isLoading
            ? CustomLoading(
                loadingBarColor: widget.model.paletteColor,
                textColor: widget.model.paletteColor)
            : RouteHandler().getRouteWidget(
                widget.routeName, widget.scaffoldKey, widget.controller));
  }

  loadAppBarTitle() {
    return NavigationTitle(
        model: widget.model,
        title: homeTitle,
        subDescription: homeSubDescription,
        callback: () => reloadWebpage());
  }

  void handleNavItemSelectEvent(String navItem, Object? extras) {
    switch (navItem) {
      case homeNavItemAccountIcon:
        handleAccountMenuEvent(extras);
        break;
      case homeNavItemSettings:
        showSettingsDrawer();
        break;
      case routeKeyCustomer:
      case routeKeyInventory:
      case routeKeyAgency:
      case routeKeyAccounting:
      case routeKeyEvents:
      case routeKeyQna:
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

  void showSettingsDrawer() => widget.scaffoldKey.currentState!.openEndDrawer();
}
