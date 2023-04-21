import 'package:flutter/material.dart';

class IntroTitle extends StatelessWidget {
  final String introTitle;
  final Color titleColor;

  const IntroTitle(
      {Key? key, required this.introTitle, required this.titleColor})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: 120,
        width: 350,
        child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15),
            child: Center(
                child: Text(introTitle,
                    style: TextStyle(
                        color: titleColor,
                        fontWeight: FontWeight.w900,
                        fontSize: 25)))));
  }
}
