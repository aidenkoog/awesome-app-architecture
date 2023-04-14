import 'package:flutter/material.dart';

class IntroLogo extends StatelessWidget {
  final Image logoImage;

  const IntroLogo({Key? key, required this.logoImage}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 25.0, bottom: 20),
      child: Center(
        child: SizedBox(width: 200, height: 150, child: logoImage),
      ),
    );
  }
}
