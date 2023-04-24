import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import 'package:flutter_web_navigation/presentation/main/base/base_screen.dart';
import 'package:flutter_web_navigation/utils/drawer_util.dart';
import '../../components/button/custom_outlined_button.dart';
import '../../container/components/main/main_content.dart';

class InventoryScreen extends BaseScreen {
  InventoryScreen(
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
  State<StatefulWidget> createState() => _InventoryScreenState();
}

class _InventoryScreenState extends BaseScreenState<InventoryScreen> {
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
      );

  @override
  getLeftTopContent() => Column(children: <Widget>[
        widget.themeModel.isMobileResolution
            ? Column(children: [
                SizedBox(
                    width: double.infinity,
                    child: CustomOutlinedButton(
                        buttonName: inventoryImportBtnText,
                        color: widget.themeModel.paletteColor,
                        callback: _onImport)),
                const SizedBox(height: 2),
                SizedBox(
                    width: double.infinity,
                    child: CustomOutlinedButton(
                        buttonName: inventoryExportBtnText,
                        color: widget.themeModel.paletteColor,
                        callback: _onExport)),
                const SizedBox(height: 2),
                SizedBox(
                    width: double.infinity,
                    child: CustomOutlinedButton(
                        buttonName: inventoryBatchRegBtnText,
                        color: widget.themeModel.paletteColor,
                        callback: _onBatchRegistration)),
                const SizedBox(height: 2),
                SizedBox(
                    width: double.infinity,
                    child: CustomOutlinedButton(
                        buttonName: inventoryDownloadSampleBtnText,
                        color: widget.themeModel.paletteColor,
                        callback: _onDownloadSample)),
                const SizedBox(height: 2),
              ])
            : Container(
                alignment: Alignment.topLeft,
                child: Row(children: [
                  const SizedBox(width: 3),
                  CustomOutlinedButton(
                      buttonName: inventoryImportBtnText,
                      color: widget.themeModel.paletteColor,
                      callback: _onImport),
                  const SizedBox(width: 3),
                  CustomOutlinedButton(
                      buttonName: inventoryExportBtnText,
                      color: widget.themeModel.paletteColor,
                      callback: _onExport),
                  const SizedBox(width: 3),
                  CustomOutlinedButton(
                      buttonName: inventoryBatchRegBtnText,
                      color: widget.themeModel.paletteColor,
                      callback: _onBatchRegistration),
                  const SizedBox(width: 3),
                  CustomOutlinedButton(
                      buttonName: inventoryDownloadSampleBtnText,
                      color: widget.themeModel.paletteColor,
                      callback: _onDownloadSample),
                  const SizedBox(height: 2),
                ])),
      ]);

  @override
  getRightTopContent() => widget.themeModel.isMobileResolution
      ? Container(
          alignment: Alignment.topLeft, padding: const EdgeInsets.all(60))
      : super.getRightTopContent();

  @override
  getScrollController() => widget.controller;

  @override
  getThemeModel() => widget.themeModel;

  _onImport() => openEndDrawerUi(widget.parentScaffoldKey);
  _onExport() => openEndDrawerUi(widget.parentScaffoldKey);
  _onBatchRegistration() => openEndDrawerUi(widget.parentScaffoldKey);
  _onDownloadSample() => openEndDrawerUi(widget.parentScaffoldKey);
}
