import 'package:flutter/material.dart';

class CustomerNoDataScreen extends StatelessWidget {
  final Color tabColor;
  const CustomerNoDataScreen({Key? key, required this.tabColor})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.warning_sharp, color: tabColor, size: 40.0),
          const SizedBox(height: 10),
          Text('No Found Data', style: TextStyle(color: tabColor, fontSize: 11))
        ]);
  }
}
