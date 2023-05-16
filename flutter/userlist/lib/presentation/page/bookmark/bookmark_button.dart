// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../controllers/bookmark_controller.dart';
import '../../../models/user_model.dart';

class BookMarkButton extends StatelessWidget {
  final BookmarkController homePageController = Get.find();
  final UserModel userModel;

  BookMarkButton(this.userModel, {super.key});

  @override
  Widget build(BuildContext context) {
    return Obx(() => IconButton(
        icon: Icon(
            !homePageController.bookMarkedUserList.contains(userModel)
                ? Icons.star_border
                : Icons.star,
            color: const Color(0xfff3685e)),
        onPressed: () => homePageController.addBookMark(userModel)));
  }
}
