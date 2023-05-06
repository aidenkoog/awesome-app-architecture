import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

import '../../../assets/strings/strings.dart';

class CustomLoading extends StatelessWidget {
  final Color loadingBarColor;
  final Color textColor;
  const CustomLoading({
    Key? key,
    required this.textColor,
    required this.loadingBarColor,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
          const SizedBox(height: 180),
          SpinKitRing(color: loadingBarColor, lineWidth: 10, size: 180),
          const SizedBox(height: 85),
          Text(loadingText,
              style: TextStyle(
                  fontSize: 25, fontWeight: FontWeight.w800, color: textColor))
        ]));
  }
}
