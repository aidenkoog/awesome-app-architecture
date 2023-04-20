import 'package:flutter/material.dart';

import '../../../../../utils/drawer_util.dart';

class MobileNavSettingsIcon extends StatelessWidget {
  final GlobalKey<ScaffoldState> scaffoldKey;

  const MobileNavSettingsIcon({Key? key, required this.scaffoldKey})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: 10,
        width: 40,
        child: IconButton(
            icon: const Icon(Icons.settings, color: Colors.white),
            onPressed: () => openEndDrawerUi(scaffoldKey)));
  }
}
