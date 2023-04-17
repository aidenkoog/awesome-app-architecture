import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core.dart';
import 'package:flutter_web_navigation/core/route_config/route_constants.dart';
import 'package:flutter_web_navigation/services/hive_storage_service.dart';

// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;

import '../components/loading/custom_loading.dart';
import '../home/drawer/custom_drawer.dart';
import 'components/home_account_icon.dart';
import 'components/home_logout_info.dart';
import 'components/home_tab_item.dart';
import 'components/home_title.dart';

class ContainerScreen extends StatefulWidget {
  final String routeName;
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey();

  ContainerScreen({
    Key? key,
    required this.routeName,
  }) : super(key: key);

  @override
  State<ContainerScreen> createState() => _ContainerScreenState();
}

class _ContainerScreenState extends State<ContainerScreen> {
  Widget? render;
  bool isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: widget._scaffoldKey,
      appBar: AppBar(
        // app bar background color.
        backgroundColor: Colors.white,

        // app bar border style.
        shape: const Border(bottom: BorderSide(color: Colors.red, width: 2)),

        // app bar title.
        title: HomeTitle(
          mainTitle: 'AidenKooG\'s Admin System',
          mainLogo: Image.asset(AllImages.flutterLogo, width: 30, height: 30),
          onTabCallback: () {
            onClickWebPageTitle();
          },
        ),

        // app bar action tab items.
        actions: [
          HomeTabItem(
            tabName: routeCustomerForDisplay,
            routeName: routeKeyCustomer,
            onTabCallback: () {
              onTabItemPressed(routeKeyCustomer);
            },
          ),
          HomeTabItem(
            tabName: routeInventoryForDisplay,
            routeName: routeKeyInventory,
            onTabCallback: () {
              onTabItemPressed(routeKeyInventory);
            },
          ),
          HomeTabItem(
            tabName: routeAgencyForDisplay,
            routeName: routeKeyAgency,
            onTabCallback: () {
              onTabItemPressed(routeKeyAgency);
            },
          ),
          HomeTabItem(
            tabName: routeAccountingForDisplay,
            routeName: routeKeyAccounting,
            onTabCallback: () {
              onTabItemPressed(routeKeyAccounting);
            },
          ),
          HomeTabItem(
            tabName: routeEventsForDisplay,
            routeName: routeKeyEvents,
            onTabCallback: () {
              onTabItemPressed(routeKeyEvents);
            },
          ),
          HomeTabItem(
            tabName: routeQnaForDisplay,
            routeName: routeKeyQna,
            onTabCallback: () {
              onTabItemPressed(routeKeyQna);
            },
          ),

          // app bar logout information.
          const HomeLogoutInfo(logoutInfo: 'Logout: 100 Hours 59 Mins 59 Secs'),

          // app bar login account icon.
          HomeAccountIcon(
              accountIcon:
                  Image.asset(AllImages.flutterLogo, width: 30, height: 30),
              accountId: 'AidenKooG',
              callback: _logOut)
        ],
      ),

      // drawer ui
      endDrawer: CustomRightDrawer(
        parentScaffoldKey: widget._scaffoldKey,
      ),

      // screen corresponding to route name.
      body: Row(
        key: UniqueKey(),
        children: [
          Expanded(
            child: isLoading
                ? const CustomLoading()
                : Center(
                    child: RouteHandeler()
                        .getRouteWidget(widget.routeName, widget._scaffoldKey)),
          ),
        ],
      ),
    );
  }

  // handler for tab item click event.
  onTabItemPressed(String routeName) {
    setState(() {
      isLoading = true;
    });
    Timer(const Duration(seconds: 1), () async {
      setState(() {
        isLoading = false;
      });
      AppRouterDelegate().setPathName(routeName);
    });
  }

  // handler for web page title click event.
  onClickWebPageTitle() {
    html.window.location.reload();
  }

  // logout user and go back to intro screen.
  // internally user is deleted from hive repository.
  _logOut() async {
    await HiveDataStorageService.logOutUser();
    AppRouterDelegate().setPathName(RouteData.intro.name, loggedIn: false);
  }
}
