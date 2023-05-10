import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

import 'presentation/pages/splash/splash_page.dart';

void main() async {
  await GetStorage.init();
  runApp(const App());
}

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  static void putControllers() {
    // Get.put();
    // Get.lazyPut();
    // Get.lazyPut();
  }

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      darkTheme: ThemeData(useMaterial3: true),
      theme: ThemeData(useMaterial3: true),
      getPages: [
        GetPage(name: '/', page: () => const SplashPage()),
      ],
    );
  }
}
