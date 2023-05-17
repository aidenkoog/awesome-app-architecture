import 'package:flutter/material.dart';

class ResponsiveLeft extends StatelessWidget {
  const ResponsiveLeft(
      {Key? key,
      this.maxContentWidth = 400,
      this.padding = EdgeInsets.zero,
      required this.child})
      : super(key: key);

  final double maxContentWidth;
  final EdgeInsetsGeometry padding;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Align(
        alignment: Alignment.centerLeft,
        child: SizedBox(
            width: maxContentWidth,
            child: Padding(padding: padding, child: child)));
  }
}
