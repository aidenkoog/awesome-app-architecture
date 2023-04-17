import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core.dart';
import 'package:flutter_web_navigation/core/route_config/route_constants.dart';
import 'package:flutter_web_navigation/presentation/components/context_menu/custom_popup_menu_button.dart';
import 'package:flutter_web_navigation/presentation/container/components/home_popup_menu_items.dart';
import 'package:flutter_web_navigation/utils/log_util.dart';

// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;

import '../../services/hive_storage_service.dart';
import '../components/loading/custom_loading.dart';
import '../home/drawer/custom_drawer.dart';
import 'components/home_account.dart';
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

          // app bar account id.
          const HomeAccount(accountId: "AidenKooG"),

          // app bar account icon.
          CustomPopupMenuButton(
            popupMenuItemList: getPopupMenuItems(context),
            childWidget:
                Image.asset(AllImages.flutterLogo, width: 30, height: 30),
            onSelected: (Object? value) {
              logd("debug", "selected popup menu item value: $value");
              onHandlePopupMenuItemEvent(value);
            },
          ),

          // right space.
          const SizedBox(
            width: 100,
          ),
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

  // handler for popup menu events.
  onHandlePopupMenuItemEvent(Object? value) {
    int selectedItemValue = value as int;
    switch (selectedItemValue) {
      case 3:
        _logOut();
        break;
      default:
        break;
    }
  }

  // logout user and go back to intro screen.
  // internally user is deleted from hive repository.
  _logOut() async {
    setState(() {
      isLoading = true;
    });
    Timer(const Duration(seconds: 1), () async {
      setState(() {
        isLoading = false;
      });
      await HiveDataStorageService.logOutUser();
      AppRouterDelegate().setPathName(RouteData.intro.name, loggedIn: false);
    });
  }
}
