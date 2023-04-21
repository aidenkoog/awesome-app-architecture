import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import 'package:flutter_web_navigation/core.dart';
import 'package:flutter_web_navigation/utils/auth_util.dart';
import 'package:flutter_web_navigation/utils/navigation_util.dart';
import '../components/button/custom_normal_button.dart';
import '../components/input_box/custom_input_box.dart';
import '../components/loading/custom_loading.dart';
import '../theme/theme_model.dart';
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
  late ThemeModel themeModel;

  @override
  void initState() {
    themeModel = ThemeModel.instance;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey.shade100,
        body: Stack(children: [
          SingleChildScrollView(
              child: Form(
                  key: widget._formKey,
                  child: isSignInStarted
                      ? CustomLoading(
                          loadingBarColor: themeModel.paletteColor,
                          textColor: themeModel.paletteColor,
                        )
                      : Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          mainAxisAlignment: MainAxisAlignment.center,
                          mainAxisSize: MainAxisSize.min,
                          children: <Widget>[
                              IntroTitle(
                                  introTitle: introTitle,
                                  titleColor: themeModel.paletteColor),
                              IntroLogo(
                                  logoImage:
                                      Image.asset(AllImages.flutterLogo)),
                              CustomInputBox(
                                  placeHolder: idPlaceHolder,
                                  focusedPlaceHolder: idFocusPlaceHolder,
                                  errorMessage: idErrorMessage,
                                  themeColor: themeModel.paletteColor,
                                  isPassword: false),
                              CustomInputBox(
                                  placeHolder: pwPlaceHolder,
                                  focusedPlaceHolder: pwFocusPlaceHolder,
                                  errorMessage: pwErrorMessage,
                                  themeColor: themeModel.paletteColor,
                                  isPassword: true),
                              CustomNormalButton(
                                  buttonText: signInBtnText,
                                  backgroundColor: themeModel.paletteColor,
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
