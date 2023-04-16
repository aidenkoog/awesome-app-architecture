import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core.dart';
import 'package:flutter_web_navigation/presentation/components/custom_drawer.dart';
import 'package:flutter_web_navigation/presentation/components/home/home_account_icon.dart';
import 'package:flutter_web_navigation/presentation/components/home/home_logout_info.dart';
import 'package:flutter_web_navigation/presentation/components/home/home_tab_item.dart';
import 'package:flutter_web_navigation/presentation/components/home/home_title.dart';
import 'package:flutter_web_navigation/services/hive_storage_service.dart';

import '../components/custom_loading.dart';
import 'dart:html' as html;

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
        title: MainTitle(
          mainTitle: 'AidenKooG\'s Admin System',
          mainLogo: Image.asset(AllImages.flutterLogo, width: 30, height: 30),
          onTabCallback: () {
            onClickWebPageTitle();
          },
        ),

        // app bar action tab items.
        actions: [
          TabItem(
            tabName: 'CUSTOMER',
            routeName: 'feature1',
            onTabCallback: () {
              onTabItemPressed('feature1');
            },
          ),
          TabItem(
            tabName: 'INVENTORY',
            routeName: 'feature2',
            onTabCallback: () {
              onTabItemPressed('feature2');
            },
          ),
          TabItem(
            tabName: 'AGENCY',
            routeName: 'feature3',
            onTabCallback: () {
              onTabItemPressed('feature3');
            },
          ),
          TabItem(
            tabName: 'ACCOUNTING',
            routeName: 'feature4',
            onTabCallback: () {
              onTabItemPressed('feature4');
            },
          ),
          TabItem(
            tabName: 'EVENTS',
            routeName: 'feature5',
            onTabCallback: () {
              onTabItemPressed('feature5');
            },
          ),
          TabItem(
            tabName: 'Q&A',
            routeName: 'feature6',
            onTabCallback: () {
              onTabItemPressed('feature6');
            },
          ),

          // app bar logout information.
          const MainLogoutInfo(logoutInfo: 'Logout: 100 Hours 59 Mins 59 Secs'),

          // app bar login account icon.
          MainAccountIcon(
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
