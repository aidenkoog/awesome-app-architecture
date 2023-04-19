import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/temp/model.dart';

class NavigationItemSettingsIcon extends StatelessWidget {
  final SampleModel model;
  final Icon icon;
  final VoidCallback onPressIconCallack;
  const NavigationItemSettingsIcon(
      {Key? key,
      required this.model,
      required this.icon,
      required this.onPressIconCallack})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    final bool isMaxxSize = MediaQuery.of(context).size.width >= 1500;

    return model.isMobileResolution
        ? Container()
        : Padding(
            padding: EdgeInsets.only(left: isMaxxSize ? 15 : 0),
            child: Container(
              padding: MediaQuery.of(context).size.width < 500
                  ? const EdgeInsets.only(top: 20, left: 5)
                  : const EdgeInsets.only(top: 10, right: 15),
              height: 60,
              width: 60,
              child: IconButton(
                icon: icon,
                onPressed: () {
                  onPressIconCallack();
                },
              ),
            ));
  }
}
