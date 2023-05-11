// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../assets/strings/strings.dart';
import '../../../controllers/lobby_controller.dart';
import '../bookmark/bookmark_page.dart';
import 'home_page.dart';

class LobbyPage extends GetView<LobbyController> {
  final List<Widget> tabs = [const HomePage(), const BookMarkPage()];

  LobbyPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text(appBarTitle)),
        body: Obx(() => tabs[controller.selectedIndex.value]),
        bottomNavigationBar: Obx(() => BottomNavigationBar(
                currentIndex: controller.selectedIndex.value,
                onTap: controller.changeTabIndex,
                items: const [
                  BottomNavigationBarItem(
                      icon: Icon(Icons.home), label: homeTabTitle),
                  BottomNavigationBarItem(
                      icon: Icon(Icons.star), label: bookmarksTabTitle)
                ])));
  }
}
