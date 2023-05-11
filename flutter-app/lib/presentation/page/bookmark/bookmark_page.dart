// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:flutter_app_architecture/presentation/page/home/home_page.dart';
import 'package:get/get.dart';
import '../../../assets/strings/strings.dart';
import '../../../controllers/bookmark_controller.dart';

class BookMarkPage extends GetView<BookmarkController> {
  const BookMarkPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      SingleChildScrollView(
          child: Obx(() => controller.bookMarkedUserList.isEmpty
              ? Center(
                  child: const Text(bookmarkNoData, textAlign: TextAlign.center)
                      .marginOnly(top: Get.height / 3))
              : Wrap(children: [
                  for (var userModel in controller.bookMarkedUserList)
                    UserComponent(userModel: userModel)
                ])))
    ]);
  }
}
