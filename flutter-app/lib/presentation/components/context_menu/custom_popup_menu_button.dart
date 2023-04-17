import 'package:flutter/material.dart';

typedef OnSelectedPopupMenuItemCallback = void Function(Object?);

class CustomPopupMenuButton extends StatelessWidget {
  final dynamic childWidget;
  final List<PopupMenuItem> popupMenuItemList;
  final OnSelectedPopupMenuItemCallback onSelected;
  const CustomPopupMenuButton(
      {Key? key,
      required this.popupMenuItemList,
      required this.childWidget,
      required this.onSelected})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return PopupMenuButton(
        child: childWidget,
        onSelected: (value) => {onSelected(value)},
        itemBuilder: (BuildContext context) {
          return popupMenuItemList;
        });
  }
}
