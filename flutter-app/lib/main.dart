import 'package:flutter/material.dart';
import 'package:flutter_app_architecture/presentation/page/splash/splash_page.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'controllers/bookmark_controller.dart';
import 'controllers/home_page_controller.dart';
import 'controllers/lobby_controller.dart';

void main() async {
  await GetStorage.init();
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  static void putControllers() {
    Get.put(BookmarkController(), permanent: true);
    Get.lazyPut(() => LobbyController(), fenix: true);
    Get.lazyPut(() => HomePageController(), fenix: true);
  }

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
        enableLog: true,
        debugShowCheckedModeBanner: false,
        title: 'Flutter App Architecture',
        transitionDuration: 300.milliseconds,
        initialBinding: BindingsBuilder(putControllers),
        theme: ThemeData(
            appBarTheme: const AppBarTheme(
                color: Colors.white,
                iconTheme: IconThemeData(color: Colors.black),
                centerTitle: true,
                titleTextStyle: TextStyle(color: Colors.black, fontSize: 18))),
        home: const SplashPage());
  }
}
