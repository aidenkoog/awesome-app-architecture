import 'package:flutter/material.dart';
import 'package:get/get.dart';

showSnackBar(String title, String message) {
  Get.snackbar("", "",
      titleText: Text(title, style: black13_700).paddingOnly(left: 5),
      messageText: Text(message, style: black13_500).paddingOnly(left: 5),
      snackPosition: SnackPosition.BOTTOM,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      backgroundColor: Colors.white,
      borderRadius: 19,
      boxShadows: snackBarBoxShadow);
}

const TextStyle black13_700 =
    TextStyle(color: Colors.black, fontWeight: FontWeight.w700, fontSize: 13.0);
const TextStyle black13_500 =
    TextStyle(color: Colors.black, fontWeight: FontWeight.w500, fontSize: 13.0);
final List<BoxShadow> snackBarBoxShadow = [
  const BoxShadow(
      color: Color(0x2b000000),
      offset: Offset(0, 0),
      blurRadius: 19,
      spreadRadius: 0)
];
