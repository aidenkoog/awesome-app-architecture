import 'package:flutter/material.dart';

class CustomNormalButton extends StatelessWidget {
  final String buttonText;
  final VoidCallback callback;
  final Color backgroundColor;

  const CustomNormalButton(
      {Key? key,
      required this.buttonText,
      required this.callback,
      required this.backgroundColor})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        height: 50,
        width: 320,
        decoration: BoxDecoration(
            color: backgroundColor, borderRadius: BorderRadius.circular(20)),
        child: TextButton(
            onPressed: () => callback(),
            child: Text(buttonText,
                style: const TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold))));
  }
}
