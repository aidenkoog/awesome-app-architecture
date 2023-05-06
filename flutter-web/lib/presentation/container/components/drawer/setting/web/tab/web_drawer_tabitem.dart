import 'package:flutter/material.dart';

class WebDrawerTabItem extends StatelessWidget {
  final String tabName;
  final bool isSelected;
  const WebDrawerTabItem(
      {Key? key, required this.tabName, required this.isSelected})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        width: 160.0,
        height: 60.0,
        padding: const EdgeInsets.all(10),
        color: isSelected ? Colors.red : Colors.transparent,
        alignment: Alignment.centerLeft,
        child: Text(tabName,
            style: TextStyle(
                color: isSelected ? Colors.white : Colors.black87,
                fontSize: 18,
                fontWeight: FontWeight.w600)));
  }
}
