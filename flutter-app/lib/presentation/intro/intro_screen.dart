import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core.dart';
import 'package:flutter_web_navigation/services/hive_storage_service.dart';
import '../../temp/model.dart';
import '../components/button/custom_normal_button.dart';
import '../components/input_box/custom_input_box.dart';
import '../components/loading/custom_loading.dart';
import 'components/intro_logo.dart';
import 'components/intro_title.dart';

class IntroScreen extends StatefulWidget {
  IntroScreen({Key? key}) : super(key: key);
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  State<IntroScreen> createState() => _IntroScreenState();
}

class _IntroScreenState extends State<IntroScreen> {
  Widget? render;
  bool isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      body: Stack(children: [
        SingleChildScrollView(
          child: Form(
            key: widget._formKey,
            child: isLoading
                ? const CustomLoading()
                : Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.center,
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      // intro title.
                      const IntroTitle(introTitle: 'AidenKooG\'s Admin System'),

                      // intro logo image.
                      IntroLogo(logoImage: Image.asset(AllImages.flutterLogo)),

                      // id input field.
                      CustomInputBox(
                        placeHolder: "Username or e-mail",
                        focusedPlaceHolder: 'Please enter your username',
                        errorMessage: 'Space input is not allowed for the name',
                        isPassword: false,
                      ),

                      // password input field.
                      CustomInputBox(
                        placeHolder: "Password",
                        focusedPlaceHolder: 'Please enter a password',
                        errorMessage: 'Wrong password in not allowed',
                        isPassword: true,
                      ),

                      // sign-in button.
                      CustomNormalButton(
                          buttonText: 'Sign In', callback: signIn)
                    ],
                  ),
          ),
        )
      ]),
    );
  }

  // sign in
  void signIn() async {
    if (widget._formKey.currentState!.validate()) {
      setState(() {
        isLoading = true;
      });
      Timer(const Duration(seconds: 1), () async {
        await updateControlItems();
        await HiveDataStorageService.logUserIn();

        setState(() {
          AppRouterDelegate().setPathName(RouteData.customer.name);
          isLoading = false;
        });
      });
    }
  }
}
