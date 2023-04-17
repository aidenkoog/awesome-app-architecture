import 'package:flutter/material.dart';

List<PopupMenuItem> getPopupMenuItems(BuildContext context) {
  return [
    const PopupMenuItem(
      value: 1,
      child: Text(
        'Go to Home',
        style: TextStyle(color: Colors.black),
      ),
    ),
    const PopupMenuItem(
        value: 2,
        child: Text(
          'Extend login session',
          style: TextStyle(color: Colors.black),
        )),
    const PopupMenuItem(
      value: 3,
      child: Text(
        'Logout',
        style: TextStyle(color: Colors.black),
      ),
    ),
    const PopupMenuItem(
        value: 4,
        child: Text(
          'Color mode',
          style: TextStyle(color: Colors.black),
        )),
    const PopupMenuItem(
        value: 5,
        child: Text(
          'To Admin',
          style: TextStyle(color: Colors.black),
        )),
    const PopupMenuItem(
        value: 6,
        child: Text(
          'Service Guide',
          style: TextStyle(color: Colors.black),
        )),
  ];
}
