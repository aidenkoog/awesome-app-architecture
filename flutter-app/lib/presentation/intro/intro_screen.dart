import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import 'package:flutter_web_navigation/core.dart';
import 'package:flutter_web_navigation/utils/auth_util.dart';
import 'package:flutter_web_navigation/utils/navigation_util.dart';
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
  bool isSignInStarted = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey.shade100,
        body: Stack(children: [
          SingleChildScrollView(
              child: Form(
                  key: widget._formKey,
                  child: isSignInStarted
                      ? const CustomLoading()
                      : Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          mainAxisAlignment: MainAxisAlignment.center,
                          mainAxisSize: MainAxisSize.min,
                          children: <Widget>[
                              const IntroTitle(introTitle: introTitle),
                              IntroLogo(
                                  logoImage:
                                      Image.asset(AllImages.flutterLogo)),
                              CustomInputBox(
                                  placeHolder: idPlaceHolder,
                                  focusedPlaceHolder: idFocusPlaceHolder,
                                  errorMessage: idErrorMessage,
                                  isPassword: false),
                              CustomInputBox(
                                  placeHolder: pwPlaceHolder,
                                  focusedPlaceHolder: pwFocusPlaceHolder,
                                  errorMessage: pwErrorMessage,
                                  isPassword: true),
                              CustomNormalButton(
                                  buttonText: signInBtnText,
                                  callback: () {
                                    signIn((state) {
                                      switch (state) {
                                        case signInStarted:
                                          setState(
                                              () => isSignInStarted = true);
                                          break;
                                        case signInCompleted:
                                          setState(
                                              () => isSignInStarted = false);
                                          navigate(RouteData.customer.name);
                                      }
                                    }, widget._formKey);
                                  })
                            ])))
        ]));
  }
}
