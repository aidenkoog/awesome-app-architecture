import 'package:flutter/material.dart';

import 'web_drawer_content.dart';

class CustomRightDrawer extends StatelessWidget {
  final GlobalKey<ScaffoldState> parentScaffoldKey;

  const CustomRightDrawer({Key? key, required this.parentScaffoldKey})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const SizedBox(
        width: 1000, child: Drawer(child: WebDrawerContent()));
  }
}
