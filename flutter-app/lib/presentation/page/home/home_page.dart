// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:lazy_load_scrollview/lazy_load_scrollview.dart';

import '../../../assets/strings/strings.dart';
import '../../../controllers/home_page_controller.dart';
import '../../../models/user_model.dart';
import '../bookmark/bookmark_button.dart';
import '../../widgets/button/image_button.dart';
import 'detail_image_page.dart';

class HomePage extends GetView<HomePageController> {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.center, children: [
      Row(children: [
        SizedBox(
                width: Get.width - 100,
                height: 50,
                child: TextField(
                    onChanged: (value) =>
                        controller.searchText.value = value.trim(),
                    decoration: const InputDecoration(
                        focusColor: Color(0xff131415),
                        contentPadding: EdgeInsets.only(left: 10),
                        hintText: searchPlaceHolder)))
            .paddingSymmetric(vertical: 5, horizontal: 10),
        ElevatedButton(
            onPressed: controller.onPressSearchImage,
            child: const Text(searchBtnTitle,
                style: TextStyle(fontWeight: FontWeight.bold)))
      ]),
      Obx(() => Expanded(
          child: LazyLoadScrollView(
              onEndOfPage: () => controller.fetchData(),
              child: SingleChildScrollView(
                  child: Wrap(children: [
                for (UserModel userModel in controller.userList)
                  UserComponent(userModel: userModel)
              ])))))
    ]);
  }
}

class UserComponent extends StatelessWidget {
  const UserComponent({super.key, required this.userModel});
  final UserModel userModel;

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Stack(children: [
        ImageButton(
            image: null,
            borderRadius: 10,
            width: Get.width / 2,
            height: Get.width / 2,
            onTap: () => Get.to(() => DetailImagePage(userModel))),
        Positioned(top: 0, right: 0, child: BookMarkButton(userModel))
      ]),
      Text(getDisplaySiteName(userModel.title), textAlign: TextAlign.center)
    ]);
  }

  getDisplaySiteName(String displaySiteName) =>
      displaySiteName.isEmpty ? noDisplaySiteName : displaySiteName;
}
