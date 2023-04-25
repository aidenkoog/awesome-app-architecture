import 'package:flutter/cupertino.dart';
import 'package:flutter_web_navigation/presentation/theme/theme_model.dart';

import '../../../assets/strings/strings.dart';
import '../../../utils/image_util.dart';
import '../../components/button/custom_normal_button.dart';
import '../../components/input_box/custom_input_box.dart';
import 'intro_logo.dart';
import 'intro_title.dart';

class IntroComponent extends StatefulWidget {
  final VoidCallback callback;
  const IntroComponent({Key? key, required this.callback}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _IntroComponentState();
}

class _IntroComponentState extends State<IntroComponent> {
  bool isSignInStarted = false;
  late ThemeModel themeModel;

  @override
  void initState() {
    themeModel = ThemeModel.instance;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          IntroTitle(
              introTitle: introTitle, titleColor: themeModel.paletteColor),
          IntroLogo(logoImage: Image.asset(AllImages.adminLogo)),
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
            callback: widget.callback,
            fontSize: 18,
            height: 50,
            width: 320,
          )
        ]);
  }
}
