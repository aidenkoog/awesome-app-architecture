import 'package:flutter/material.dart';

class CustomDetailItem extends StatelessWidget {
  final Color iconColor;
  final Color labelFontColor;
  final Color contentFontColor;
  final String label;
  final String content;
  const CustomDetailItem(
      {Key? key,
      required this.label,
      required this.content,
      required this.iconColor,
      required this.labelFontColor,
      required this.contentFontColor})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        width: 300,
        margin: const EdgeInsets.only(bottom: 10),
        child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Row(children: [
                Icon(Icons.check_circle_rounded, color: iconColor),
                const SizedBox(width: 8),
                Text(label,
                    style: TextStyle(
                        color: labelFontColor,
                        fontSize: 13,
                        fontWeight: FontWeight.w600))
              ]),
              Container(
                  width: 180,
                  alignment: Alignment.centerLeft,
                  child: Text(content,
                      style: TextStyle(color: contentFontColor, fontSize: 12)))
            ]));
  }
}
