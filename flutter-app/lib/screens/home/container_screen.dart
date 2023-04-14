import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core.dart';
import 'package:flutter_web_navigation/screens/components/top_menu_tab_item.dart';
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
        title: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            const SizedBox(
              width: 85,
            ),
            Image.network(
              'https://lh3.googleusercontent.com/rSQpAc0Z3nv8cIEub9qYcAbKUvUTelb3HdPhGaToFW6Mqwgap9oqHdXdMaWwYLx44A=s180-rw',
              width: 30,
              height: 30,
            ),
            Container(
                padding: const EdgeInsets.all(8.0),
                child: const Text('AidenKooG\'s Admin System',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                        fontSize: 25)))
          ],
        ),
        actions: [
          // tab items.
          const TabItem(tabName: 'CUSTOMER', routeName: 'feature1'),
          const TabItem(tabName: 'INVENTORY', routeName: 'feature2'),
          const TabItem(tabName: 'AGENCY', routeName: 'feature3'),
          const TabItem(tabName: 'ACCOUNTING', routeName: 'feature4'),
          const TabItem(tabName: 'EVENTS', routeName: 'feature5'),
          const TabItem(tabName: 'Q&A', routeName: 'feature6'),
          Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(mainAxisAlignment: MainAxisAlignment.start, children: [
                const SizedBox(
                  width: 80,
                ),
                InkWell(
                  onTap: () => {AppRouterDelegate().setPathName('feature6')},
                  child: const Center(
                    child: Text(
                      'LOGOUT : 100 Hours 59 Mins 59 Secs',
                      style: TextStyle(color: Colors.black, fontSize: 14),
                    ),
                  ),
                ),
              ])),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: InkWell(
              onTap: () => _logOut(),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  const SizedBox(
                    width: 20,
                  ),
                  Image.network(
                    'https://lh3.googleusercontent.com/rSQpAc0Z3nv8cIEub9qYcAbKUvUTelb3HdPhGaToFW6Mqwgap9oqHdXdMaWwYLx44A=s180-rw',
                    width: 30,
                    height: 30,
                  ),
                  Container(
                      padding: const EdgeInsets.all(8.0),
                      child: const Text('AidenKooG',
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                              fontSize: 18))),
                  const SizedBox(
                    width: 150,
                  ),
                ],
              ),
            ),
          )
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
