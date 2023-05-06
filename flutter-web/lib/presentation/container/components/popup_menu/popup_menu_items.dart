import 'package:flutter/material.dart';

import '../../../../assets/strings/strings.dart';

List<PopupMenuItem> getPopupMenuItems(BuildContext context) {
  return [
    const PopupMenuItem(
        value: 0,
        child: Text(popupMenuGoToHome, style: TextStyle(color: Colors.black))),
    const PopupMenuItem(
        value: 1,
        child: Text(popupMenuExtendLoginSession,
            style: TextStyle(color: Colors.black))),
    const PopupMenuItem(
        value: 2,
        child: Text(popupMenuLogout, style: TextStyle(color: Colors.black))),
    const PopupMenuItem(
        value: 3,
        child: Text(popupMenuColorMode, style: TextStyle(color: Colors.black))),
    const PopupMenuItem(
        value: 4,
        child: Text(popupMenuToAdmin, style: TextStyle(color: Colors.black))),
    const PopupMenuItem(
        value: 5,
        child:
            Text(popupMenuServiceGuide, style: TextStyle(color: Colors.black))),
  ];
}
