import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import 'package:flutter_web_navigation/presentation/main/base/base_screen.dart';
import 'package:flutter_web_navigation/utils/drawer_util.dart';
import '../../components/button/custom_outlined_button.dart';
import '../../container/components/main/main_content.dart';

class AgencyScreen extends BaseScreen {
  AgencyScreen(
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
  State<StatefulWidget> createState() => _AgencyScreenState();
}

class _AgencyScreenState extends BaseScreenState<AgencyScreen> {
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
                        buttonName: agencyBtn1Text,
                        color: widget.themeModel.paletteColor,
                        callback: _onClickAgency)),
                const SizedBox(height: 2),
                SizedBox(
                    width: double.infinity,
                    child: CustomOutlinedButton(
                        buttonName: agencyBtn2Text,
                        color: widget.themeModel.paletteColor,
                        callback: _onClickAgency2)),
                const SizedBox(height: 2),
                SizedBox(
                    width: double.infinity,
                    child: CustomOutlinedButton(
                        buttonName: agencyBtn3Text,
                        color: widget.themeModel.paletteColor,
                        callback: _onClickAgency3)),
                const SizedBox(height: 2),
              ])
            : Container(
                alignment: Alignment.topLeft,
                child: Row(children: [
                  const SizedBox(width: 3),
                  CustomOutlinedButton(
                      buttonName: agencyBtn1Text,
                      color: widget.themeModel.paletteColor,
                      callback: _onClickAgency),
                  const SizedBox(width: 3),
                  CustomOutlinedButton(
                      buttonName: agencyBtn2Text,
                      color: widget.themeModel.paletteColor,
                      callback: _onClickAgency2),
                  const SizedBox(width: 3),
                  CustomOutlinedButton(
                      buttonName: agencyBtn3Text,
                      color: widget.themeModel.paletteColor,
                      callback: _onClickAgency3),
                  const SizedBox(height: 2),
                ])),
      ]);

  @override
  getRightTopContent() => widget.themeModel.isMobileResolution
      ? Container(
          alignment: Alignment.topLeft, padding: const EdgeInsets.all(45))
      : super.getRightTopContent();

  @override
  getScrollController() => widget.controller;

  @override
  getThemeModel() => widget.themeModel;

  _onClickAgency() => openEndDrawerUi(widget.parentScaffoldKey);
  _onClickAgency2() => openEndDrawerUi(widget.parentScaffoldKey);
  _onClickAgency3() => openEndDrawerUi(widget.parentScaffoldKey);
}
