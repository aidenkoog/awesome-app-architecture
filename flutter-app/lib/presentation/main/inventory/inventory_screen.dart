import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import 'package:flutter_web_navigation/presentation/main/base/base_screen.dart';
import 'package:flutter_web_navigation/utils/drawer_util.dart';
import '../../components/button/custom_outlined_button.dart';
import '../../container/components/main/main_content.dart';
import '../../components/card/custom_detail_card.dart';
import '../../components/form/custom_detail_item.dart';
import '../../components/tabbar/custom_tab_bar.dart';

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
        rightCardContent: getRightCardContent(),
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
  getRightCardContent() => Container(
      padding: const EdgeInsets.all(15),
      child: Column(children: [
        Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
          Row(children: [
            Text('AB:CD:00:00:00:00',
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: widget.themeModel.paletteColor,
                    fontSize: 20))
          ])
        ]),
        const SizedBox(height: 10),
        Divider(
            color: widget.themeModel.themeData.colorScheme.brightness ==
                    Brightness.dark
                ? const Color.fromRGBO(61, 61, 61, 1)
                : const Color.fromRGBO(238, 238, 238, 1),
            thickness: 3),
        const SizedBox(height: 10),
        Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
          Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            CustomDetailItem(
                content: 'COMPLETED',
                contentFontColor: widget.themeModel.paletteColor,
                iconColor: widget.themeModel.paletteColor,
                label: 'STATE',
                labelFontColor: widget.themeModel.paletteColor),
            CustomDetailItem(
                content: 'COMPLETED',
                contentFontColor: widget.themeModel.paletteColor,
                iconColor: widget.themeModel.paletteColor,
                label: 'DATE',
                labelFontColor: widget.themeModel.paletteColor),
          ]),
          Column(children: [
            Row(children: [
              CustomDetailCard(
                  color: widget.themeModel.paletteColor,
                  title: 'CARD 1',
                  description: null,
                  contentTitle: 'CONTENT TITLE',
                  hasTitleButton: false),
              CustomDetailCard(
                  color: widget.themeModel.paletteColor,
                  title: 'CARD 2',
                  description: null,
                  contentTitle: 'CONTENT TITLE',
                  hasTitleButton: true)
            ])
          ])
        ]),
        const SizedBox(height: 80),
        CustomTabBar(tabColor: widget.themeModel.paletteColor, tabLength: 2)
      ]));

  @override
  getScrollController() => widget.controller;

  @override
  getThemeModel() => widget.themeModel;

  _onImport() => openEndDrawerUi(widget.parentScaffoldKey);
  _onExport() => openEndDrawerUi(widget.parentScaffoldKey);
  _onBatchRegistration() => openEndDrawerUi(widget.parentScaffoldKey);
  _onDownloadSample() => openEndDrawerUi(widget.parentScaffoldKey);
}
