import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import 'package:flutter_web_navigation/presentation/main/base/base_screen.dart';
import 'package:flutter_web_navigation/utils/drawer_util.dart';
import '../../components/button/custom_outlined_button.dart';
import '../../container/components/main/main_content.dart';

class EventScreen extends BaseScreen {
  EventScreen(
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
  State<StatefulWidget> createState() => _EventScreenState();
}

class _EventScreenState extends BaseScreenState<EventScreen> {
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
  getLeftTopContent() => Column(children: <Widget>[
        widget.themeModel.isMobileResolution
            ? Column(children: [
                SizedBox(
                    width: double.infinity,
                    child: CustomOutlinedButton(
                        buttonName: eventsDownloadExcelBtnText,
                        color: widget.themeModel.paletteColor,
                        callback: _onDownloadExcel)),
                const SizedBox(height: 2)
              ])
            : Column(children: [
                Container(
                    alignment: Alignment.topLeft,
                    child: CustomOutlinedButton(
                        buttonName: eventsDownloadExcelBtnText,
                        color: widget.themeModel.paletteColor,
                        callback: _onDownloadExcel)),
                const SizedBox(height: 2)
              ])
      ]);

  @override
  getScrollController() => widget.controller;

  @override
  getThemeModel() => widget.themeModel;

  _onDownloadExcel() => openEndDrawerUi(widget.parentScaffoldKey);
}
