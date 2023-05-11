// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../../assets/strings/strings.dart';
import '../../../models/user_model.dart';
import '../../widgets/button/image_button.dart';
import '../bookmark/bookmark_button.dart';

class DetailImagePage extends StatelessWidget {
  final UserModel userModel;

  const DetailImagePage(this.userModel, {super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.black,
        appBar: AppBar(
            elevation: 0,
            automaticallyImplyLeading: false,
            leading: UnconstrainedBox(
                child: IconButton(
                    icon: const Icon(Icons.arrow_back,
                        size: 20, color: Colors.black),
                    onPressed: Get.back)),
            title: const Text(detailPageTitle, style: black18_500),
            actions: [BookMarkButton(userModel)]),
        body: SizedBox(
            width: Get.width,
            height: Get.height - 120,
            child: Column(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  ImageButton(
                      width: Get.width,
                      height: Get.height - 120,
                      image: null,
                      borderRadius: 0,
                      boxFit: BoxFit.fitHeight)
                ])));
  }
}

const TextStyle black18_500 =
    TextStyle(color: Colors.black, fontWeight: FontWeight.w600, fontSize: 18.0);
