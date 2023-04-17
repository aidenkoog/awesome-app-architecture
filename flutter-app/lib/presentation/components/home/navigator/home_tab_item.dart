import 'package:flutter/material.dart';

class HomeTabItem extends StatelessWidget {
  final String tabName;
  final String routeName;
  final VoidCallback onTabCallback;

  const HomeTabItem(
      {Key? key,
      required this.tabName,
      required this.routeName,
      required this.onTabCallback})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: InkWell(
        onTap: () => {onTabCallback()},
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
