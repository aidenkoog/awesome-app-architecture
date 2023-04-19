// ignore_for_file: avoid_web_libraries_in_flutter

import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core.dart';
import 'package:flutter_web_navigation/core/global_config/navigation_constants.dart';
import 'dart:html' as html;
import '../../services/hive_storage_service.dart';
import '../../temp/model.dart';
import 'components/scaffold/mobile_scaffold.dart';
import 'components/scaffold/web_scaffold.dart';

class ContainerScreen extends StatefulWidget {
  final String routeName;
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey();
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
  bool isLoading = false;

  // modle is initalized late in initState function.
  late SampleModel sampleListModel;

  @override
  void initState() {
    sampleListModel = SampleModel.instance;
    _setupPaletteColors();
    sampleListModel.addListener(_handleChange);
    super.initState();
  }

  // needed for changing light & dark theme.
  void _handleChange() {
    if (mounted) {
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    final SampleModel model = sampleListModel;

    // resolution for mobile size.
    model.isMobileResolution = (MediaQuery.of(context).size.width) < 1300;

    return SafeArea(
        child: model.isMobileResolution
            ? HomeMobileScaffold(
                widget._scaffoldKey, model, widget.controller, '')
            : HomeWebScaffold(
                widget._scaffoldKey, model, widget.controller, ''));
  }

  // handler for tab item click event.
  onTabItemPressed(String routeName) {
    setState(() {
      isLoading = true;
    });
    Timer(const Duration(seconds: 1), () async {
      setState(() {
        isLoading = false;
      });
      AppRouterDelegate().setPathName(routeName);
    });
  }

  // handler for navigation item click event.
  onClickNavigationItem(itemPosition) {
    switch (itemPosition) {
      case customerNavigationItem:
      default:
    }
  }

  // handler for web page title click event.
  onClickWebPageTitle() {
    html.window.location.reload();
  }

  // handler for popup menu events.
  onHandlePopupMenuItemEvent(Object? value) {
    int selectedItemValue = value as int;
    switch (selectedItemValue) {
      case 3:
        _logOut();
        break;
      default:
        break;
    }
  }

  // logout user and go back to intro screen.
  // internally user is deleted from hive repository.
  _logOut() async {
    setState(() {
      isLoading = true;
    });
    Timer(const Duration(seconds: 1), () async {
      setState(() {
        isLoading = false;
      });
      await HiveDataStorageService.logOutUser();
      AppRouterDelegate().setPathName(RouteData.intro.name, loggedIn: false);
    });
  }

  // setup palette colors for light and dark theme.
  void _setupPaletteColors() {
    // light.
    sampleListModel.paletteColors = <Color>[
      const Color.fromRGBO(0, 116, 227, 1),
      const Color.fromRGBO(230, 74, 25, 1),
      const Color.fromRGBO(216, 27, 96, 1),
      const Color.fromRGBO(103, 58, 184, 1),
      const Color.fromRGBO(2, 137, 123, 1)
    ];
    // dark.
    sampleListModel.darkPaletteColors = <Color>[
      const Color.fromRGBO(68, 138, 255, 1),
      const Color.fromRGBO(255, 110, 64, 1),
      const Color.fromRGBO(238, 79, 132, 1),
      const Color.fromRGBO(180, 137, 255, 1),
      const Color.fromRGBO(29, 233, 182, 1)
    ];
    // border.
    sampleListModel.paletteBorderColors = <Color>[
      const Color.fromRGBO(0, 116, 227, 1),
      Colors.transparent,
      Colors.transparent,
      Colors.transparent,
      Colors.transparent
    ];
  }
}
