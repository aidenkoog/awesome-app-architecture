// ignore_for_file: prefer_typing_uninitialized_variables, file_names
import 'package:flutter/material.dart';

class Button extends StatelessWidget {
  final Widget child;
  final VoidCallback? onTap;
  final VoidCallback? onLongPress;
  final padding;
  final double borderRadius;
  final Color? splashcolor, highlightcolor;
  final BoxDecoration? decoration;
  final Clip clipBehavior;

  const Button(
      {required this.child,
      Key? key,
      this.padding = 0.0,
      this.onTap,
      this.onLongPress,
      this.splashcolor,
      this.highlightcolor,
      this.decoration,
      this.clipBehavior = Clip.none,
      this.borderRadius = 15.0})
      : super(key: key);

  bool isInteger(num value) =>
      value is int || value == value.roundToDouble() || value is double;

  @override
  Widget build(BuildContext context) {
    return Material(
        type: MaterialType.transparency,
        clipBehavior: clipBehavior,
        child: Ink(
            decoration: decoration,
            child: (InkWell(
                splashColor: splashcolor,
                highlightColor: highlightcolor,
                borderRadius: BorderRadius.circular(borderRadius),
                onTap: onTap,
                onLongPress: onLongPress,
                child: Padding(
                    padding: padding is int || padding is double
                        ? EdgeInsets.all(padding.toDouble())
                        : padding,
                    child: child)))));
  }
}
