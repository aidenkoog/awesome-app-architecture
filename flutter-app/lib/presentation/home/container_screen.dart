import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core.dart';
import 'package:flutter_web_navigation/presentation/components/main_account_icon.dart';
import 'package:flutter_web_navigation/presentation/components/main_logout_info.dart';
import 'package:flutter_web_navigation/presentation/components/main_tab_item.dart';
import 'package:flutter_web_navigation/presentation/components/main_title.dart';
import 'package:flutter_web_navigation/services/hive_storage_service.dart';

class ContainerScreen extends StatefulWidget {
  final String routeName;
  const ContainerScreen({
    Key? key,
    required this.routeName,
  }) : super(key: key);

  @override
  State<ContainerScreen> createState() => _ContainerScreenState();
}

class _ContainerScreenState extends State<ContainerScreen> {
  Widget? render;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        shape: const Border(bottom: BorderSide(color: Colors.red, width: 2)),
        title: MainTitle(
            mainTitle: 'AidenKooG\'s Admin System',
            mainLogo:
                Image.asset(AllImages.flutterLogo, width: 30, height: 30)),
        actions: [
          const TabItem(tabName: 'CUSTOMER', routeName: 'feature1'),
          const TabItem(tabName: 'INVENTORY', routeName: 'feature2'),
          const TabItem(tabName: 'AGENCY', routeName: 'feature3'),
          const TabItem(tabName: 'ACCOUNTING', routeName: 'feature4'),
          const TabItem(tabName: 'EVENTS', routeName: 'feature5'),
          const TabItem(tabName: 'Q&A', routeName: 'feature6'),
          const MainLogoutInfo(logoutInfo: 'Logout: 100 Hours 59 Mins 59 Secs'),
          MainAccountIcon(
              accountIcon:
                  Image.asset(AllImages.flutterLogo, width: 30, height: 30),
              accountId: 'AidenKooG',
              callback: _logOut)
        ],
      ),
      body: Row(
        key: UniqueKey(),
        children: [
          Expanded(
            child:
                Center(child: RouteHandeler().getRouteWidget(widget.routeName)),
          ),
        ],
      ),
    );
  }

  _logOut() async {
    await HiveDataStorageService.logOutUser();
    AppRouterDelegate().setPathName(RouteData.intro.name, loggedIn: false);
  }
}
