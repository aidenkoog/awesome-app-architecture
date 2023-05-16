import 'package:flutter/material.dart';
import '../../routes/route_handler.dart';
import '../../utils/auth_util.dart';
import '../../utils/navigation_util.dart';
import '../components/loading/custom_loading.dart';
import '../theme/theme_model.dart';
import 'components/intro_component.dart';

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
                      : IntroComponent(callback: () {
                          signIn((state) {
                            switch (state) {
                              case signInStarted:
                                setState(() => isSignInStarted = true);
                                break;
                              case signInCompleted:
                                setState(() => isSignInStarted = false);
                                navigate(RouteData.customer.name);
                            }
                          }, widget._formKey);
                        })))
        ]));
  }
}
