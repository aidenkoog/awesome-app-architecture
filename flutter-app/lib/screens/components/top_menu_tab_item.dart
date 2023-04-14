import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core.dart';

class TabItem extends StatelessWidget {
  final String tabName;
  final String routeName;

  const TabItem({
    Key? key,
    required this.tabName,
    required this.routeName,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: InkWell(
        onTap: () => {AppRouterDelegate().setPathName(routeName)},
        child: Center(
          child: Text(
            tabName,
            style: const TextStyle(
                color: Colors.black, fontSize: 15, fontWeight: FontWeight.w600),
          ),
        ),
      ),
    );
  }
}
