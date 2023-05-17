import 'package:flutter/material.dart';

class ConstrainedTextBox extends StatelessWidget {
  const ConstrainedTextBox({
    Key? key,
    required this.data,
    required this.minWidth,
    this.color,
    this.fontSize = 12.0,
    this.fontWeight = FontWeight.bold,
    this.textAlign = TextAlign.center,
  }) : super(key: key);

  final String? data;
  final double? minWidth;
  final Color? color;
  final double fontSize;
  final FontWeight fontWeight;
  final TextAlign textAlign;

  @override
  Widget build(BuildContext context) {
    return Container(
        constraints: BoxConstraints(minWidth: minWidth!),
        child: Text(data!,
            style: TextStyle(
                color: color != null ? color! : Colors.grey[500],
                fontSize: fontSize,
                fontWeight: fontWeight),
            textAlign: textAlign));
  }
}
