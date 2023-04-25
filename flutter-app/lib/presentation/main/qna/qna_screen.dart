import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/main/base/base_screen.dart';
import '../../container/components/main/main_content.dart';

class QnaScreen extends BaseScreen {
  QnaScreen(
      {Key? key,
      required String routeName,
      required GlobalKey<ScaffoldState> parentScaffoldKey,
      required ScrollController controller})
      : super(
            key: key,
            controller: controller,
            routeName: routeName,
            parentScaffoldKey: parentScaffoldKey);

  @override
  State<StatefulWidget> createState() => _QnaScreenState();
}

class _QnaScreenState extends BaseScreenState<QnaScreen> {
  Widget? render;

  @override
  Widget build(BuildContext context) {
    return widget.themeModel.isMobileResolution
        ? Container(
            transform: Matrix4.translationValues(0, -1, 0),
            child: getScrollableWidget(widget.themeModel))
        : getMainLayout();
  }

  @override
  getMainLayout() => MainContent(
        routeName: widget.routeName,
        scrollController: widget.controller,
        leftTopContent: getLeftTopContent(),
        rightTopContent: getRightTopContent(),
        rightCardContent: getRightCardContent(),
      );

  @override
  getRightTopContent() => Container(
      alignment: Alignment.topLeft, padding: const EdgeInsets.all(20));

  @override
  getScrollController() => widget.controller;

  @override
  getThemeModel() => widget.themeModel;
}
