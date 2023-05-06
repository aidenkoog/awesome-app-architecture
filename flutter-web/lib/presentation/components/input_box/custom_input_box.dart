import 'package:flutter/material.dart';

class CustomInputBox extends StatelessWidget {
  final TextEditingController emailController = TextEditingController(text: "");
  final TextEditingController passwordController =
      TextEditingController(text: "");

  final bool isPassword;
  final String placeHolder;
  final String focusedPlaceHolder;
  final String errorMessage;
  final Color themeColor;

  CustomInputBox(
      {Key? key,
      required this.placeHolder,
      required this.focusedPlaceHolder,
      required this.errorMessage,
      required this.isPassword,
      required this.themeColor})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: 80,
        width: 350,
        child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15),
            child: TextFormField(
                cursorColor: themeColor,
                validator: (String? str) {
                  if (str!.isEmpty) {
                    return errorMessage;
                  }
                  return null;
                },
                style: TextStyle(color: themeColor),
                controller: isPassword ? passwordController : emailController,
                autovalidateMode: AutovalidateMode.onUserInteraction,
                decoration: InputDecoration(
                    border: OutlineInputBorder(
                        borderSide: BorderSide(color: themeColor)),
                    focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: themeColor, width: 2.0)),
                    disabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: themeColor)),
                    labelText: placeHolder,
                    labelStyle: TextStyle(color: themeColor),
                    focusColor: themeColor,
                    hintStyle: TextStyle(color: themeColor),
                    hintText: focusedPlaceHolder))));
  }
}
