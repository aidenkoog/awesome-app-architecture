import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core.dart';
import 'package:flutter_web_navigation/screens/components/custom_input_box.dart';
import 'package:flutter_web_navigation/screens/components/custom_normal_button.dart';
import 'package:flutter_web_navigation/screens/components/intro_logo.dart';
import 'package:flutter_web_navigation/screens/components/intro_title.dart';
import 'package:flutter_web_navigation/services/hive_storage_service.dart';

class Intro extends StatelessWidget {
  Intro({Key? key}) : super(key: key);
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      body: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              const IntroTitle(introTitle: 'AidenKooG\'s Admin System'),
              IntroLogo(logoImage: Image.asset(AllImages.flutterLogo)),
              CustomInputBox(
                placeHolder: "Username or e-mail",
                focusedPlaceHolder: 'Please enter your username',
                errorMessage: 'Space input is not allowed for the name',
                isPassword: false,
              ),
              CustomInputBox(
                placeHolder: "Password",
                focusedPlaceHolder: 'Please enter a password',
                errorMessage: 'Wrong password in not allowed',
                isPassword: true,
              ),
              CustomNormalButton(buttonText: 'Sign In', callback: logIn)
            ],
          ),
        ),
      ),
    );
  }

  logIn() async {
    if (_formKey.currentState!.validate()) {
      await HiveDataStorageService.logUserIn();
      AppRouterDelegate().setPathName(RouteData.feature1.name);
    }
  }
}
