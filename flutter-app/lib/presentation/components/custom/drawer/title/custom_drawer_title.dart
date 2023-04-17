import 'package:flutter/material.dart';

import '../../../../../utils/images.dart';

class CustomDrawerTitle extends StatelessWidget {
  final String drawerTitle;
  const CustomDrawerTitle({Key? key, required this.drawerTitle})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        alignment: Alignment.centerLeft,
        padding: const EdgeInsets.all(18),
        child: Row(children: [
          Expanded(
              flex: 5,
              child: Text(
                drawerTitle,
                style: const TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.w900,
                    fontSize: 30),
              )),
          Expanded(
              flex: 5,
              child: Container(
                  alignment: Alignment.centerRight,
                  child: Image.asset(AllImages.flutterLogo,
                      width: 30, height: 30)))
        ]));
  }
}
