import 'package:flutter/material.dart';

// currently, it's not used.
class CustomDimContainer extends StatelessWidget {
  const CustomDimContainer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(color: Colors.black45.withOpacity(0.5));
  }
}
