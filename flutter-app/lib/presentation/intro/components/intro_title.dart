import 'package:flutter/material.dart';

class IntroTitle extends StatelessWidget {
  final String introTitle;

  const IntroTitle({Key? key, required this.introTitle}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: 120,
        width: 350,
        child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15),
            child: Center(
                child: Text(introTitle,
                    style: const TextStyle(
                        color: Colors.black87,
                        fontWeight: FontWeight.w900,
                        fontSize: 25)))));
  }
}
