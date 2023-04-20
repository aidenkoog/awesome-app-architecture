import 'package:flutter/material.dart';

class MobileNavigationIcon extends StatelessWidget {
  final Icon icon;
  const MobileNavigationIcon({
    Key? key,
    required this.icon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) =>
      Padding(padding: const EdgeInsets.fromLTRB(8, 8, 0, 0), child: icon);
}
