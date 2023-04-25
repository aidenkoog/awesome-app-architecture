import 'package:flutter/material.dart';

class CustomNormalButton extends StatelessWidget {
  final String buttonText;
  final VoidCallback callback;
  final Color backgroundColor;
  final double height;
  final double width;
  final double fontSize;

  const CustomNormalButton(
      {Key? key,
      required this.buttonText,
      required this.callback,
      required this.backgroundColor,
      required this.height,
      required this.width,
      required this.fontSize})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        height: height,
        width: width,
        decoration: BoxDecoration(
            border: Border.all(color: backgroundColor, width: 1.1),
            color: Colors.white,
            borderRadius: BorderRadius.circular(8)),
        child: TextButton(
            onPressed: () => callback(),
            child: Text(buttonText,
                style: TextStyle(
                    color: backgroundColor,
                    fontSize: fontSize,
                    fontWeight: FontWeight.bold))));
  }
}
