import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core.dart';
import 'package:get/get.dart';

import 'assets/messages.dart';

class App extends StatelessWidget {
  final bool isLoggedIn;
  const App({Key? key, required this.isLoggedIn}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: 'Flutter AidenKooG\'s Admin System',
      translations: Messages(),
      locale: Get.deviceLocale,
      fallbackLocale: const Locale('en', 'US'),
      routeInformationParser: RoutesInformationParser(),
      routerDelegate: AppRouterDelegate(isLoggedIn: isLoggedIn),
    );
  }
}
