import 'package:flutter/material.dart';

class CustomInputBox extends StatelessWidget {
  final TextEditingController emailController = TextEditingController(text: "");
  final TextEditingController passwordController =
      TextEditingController(text: "");

  final bool isPassword;
  final String placeHolder;
  final String focusedPlaceHolder;
  final String errorMessage;

  CustomInputBox(
      {Key? key,
      required this.placeHolder,
      required this.focusedPlaceHolder,
      required this.errorMessage,
      required this.isPassword})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 80,
      width: 350,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 15),
        child: TextFormField(
          validator: (String? str) {
            if (str!.isEmpty) {
              return errorMessage;
            }
            return null;
          },
          controller: isPassword ? passwordController : emailController,
          autovalidateMode: AutovalidateMode.onUserInteraction,
          decoration: InputDecoration(
              border: const OutlineInputBorder(),
              labelText: placeHolder,
              hintText: focusedPlaceHolder),
        ),
      ),
    );
  }
}
