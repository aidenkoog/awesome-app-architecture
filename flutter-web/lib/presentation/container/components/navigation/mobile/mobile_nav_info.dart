import 'package:flutter/material.dart';

class MobileNavigationInfo extends StatelessWidget {
  final String infoText;
  const MobileNavigationInfo({
    Key? key,
    required this.infoText,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.fromLTRB(20, 8, 0, 0),
        child: Text(infoText,
            style: const TextStyle(
                color: Colors.white,
                fontSize: 14,
                letterSpacing: 0.26,
                fontFamily: 'HeeboBold',
                fontWeight: FontWeight.normal)));
  }
}
