import 'package:flutter/material.dart';

class MobileNavigationInfo extends StatelessWidget {
  final String infoText;
  final Icon icon;
  const MobileNavigationInfo({
    Key? key,
    required this.infoText,
    required this.icon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        // logout information text.
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 8, 0, 0),
          child: Text(infoText,
              style: const TextStyle(
                  color: Colors.white,
                  fontSize: 14,
                  letterSpacing: 0.26,
                  fontFamily: 'HeeboBold',
                  fontWeight: FontWeight.normal)),
        ),

        // user account icon.
        Padding(
          padding: const EdgeInsets.fromLTRB(8, 8, 0, 0),
          child: IconButton(icon: icon, onPressed: () {}),
        )
      ],
    );
  }
}
