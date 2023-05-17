import 'package:flutter/material.dart';

class ResponsiveLayout extends StatelessWidget {
  const ResponsiveLayout(
      {Key? key, required this.mobilePage, required this.desktopPage})
      : super(key: key);

  final Widget mobilePage;
  final Widget desktopPage;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
      if (constraints.maxWidth < 400) {
        return mobilePage;
      } else {
        return desktopPage;
      }
    });
  }
}
