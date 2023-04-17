import 'package:flutter/material.dart';

import 'custom_drawer_content.dart';

class CustomRightDrawer extends StatelessWidget {
  // ignore: prefer_typing_uninitialized_variables
  final parentScaffoldKey;

  const CustomRightDrawer({Key? key, required this.parentScaffoldKey})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const SizedBox(
        width: 1000, child: Drawer(child: CustomDrawerContent()));
  }
}
