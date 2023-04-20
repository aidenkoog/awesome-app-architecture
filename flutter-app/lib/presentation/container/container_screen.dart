import 'package:flutter/material.dart';
import '../theme/theme_model.dart';
import 'components/scaffold/mobile/mobile_scaffold.dart';
import 'components/scaffold/web/web_scaffold.dart';

class ContainerScreen extends StatefulWidget {
  final String routeName;
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey();
  final ScrollController controller = ScrollController();

  ContainerScreen({
    Key? key,
    required this.routeName,
  }) : super(key: key);

  @override
  State<ContainerScreen> createState() => _ContainerScreenState();
}

class _ContainerScreenState extends State<ContainerScreen> {
  Widget? render;
  late ThemeModel themeModel;

  @override
  void initState() {
    themeModel = ThemeModel.instance;
    themeModel.setupPaletteColors();
    themeModel.addListener(() => mounted ? setState(() {}) : {});
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final ThemeModel model = themeModel;
    model.isMobileResolution = (MediaQuery.of(context).size.width) < 1300;

    return SafeArea(
        child: model.isMobileResolution
            ? HomeMobileScaffold(
                scaffoldKey: widget.scaffoldKey,
                model: model,
                controller: widget.controller)
            : HomeWebScaffold(
                scaffoldKey: widget.scaffoldKey,
                model: model,
                controller: widget.controller));
  }
}
