import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import 'package:flutter_web_navigation/presentation/components/button/custom_normal_button.dart';
import 'package:flutter_web_navigation/presentation/main/base/base_screen.dart';
import 'package:flutter_web_navigation/presentation/main/customer/components/customer_detail_card.dart';
import 'package:flutter_web_navigation/presentation/main/customer/components/customer_detail_header_card.dart';
import 'package:flutter_web_navigation/presentation/main/customer/components/customer_tab_bar.dart';
import 'package:flutter_web_navigation/utils/drawer_util.dart';
import '../../components/button/custom_outlined_button.dart';
import '../../container/components/main/main_content.dart';
import 'components/customer_detail_item.dart';

class CustomerScreen extends BaseScreen {
  CustomerScreen(
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
  State<StatefulWidget> createState() => _CustomerScreenState();
}

class _CustomerScreenState extends BaseScreenState<CustomerScreen> {
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
                        buttonName: customerDrawerShowBtnText,
                        color: widget.themeModel.paletteColor,
                        callback: _onAddCustomer)),
                const SizedBox(height: 2)
              ])
            : Column(children: [
                Container(
                    alignment: Alignment.topLeft,
                    child: CustomOutlinedButton(
                        buttonName: customerDrawerShowBtnText,
                        color: widget.themeModel.paletteColor,
                        callback: _onAddCustomer)),
                const SizedBox(height: 2)
              ])
      ]);

  @override
  getRightCardContent() => Container(
      padding: const EdgeInsets.all(15),
      child: Column(children: [
        Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
          Row(children: [
            Text('AidenKooG',
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: widget.themeModel.paletteColor,
                    fontSize: 20)),
            const SizedBox(width: 8),
            CustomNormalButton(
                buttonText: 'REQUEST',
                callback: () {},
                backgroundColor: widget.themeModel.paletteColor,
                fontSize: 11,
                height: 25,
                width: 70),
            const SizedBox(width: 5),
            CustomNormalButton(
                buttonText: 'CANCEL',
                callback: () {},
                backgroundColor: widget.themeModel.paletteColor,
                fontSize: 11,
                height: 25,
                width: 70)
          ]),
          const SizedBox(width: 40),
          Row(children: [
            CustomerDetailHeaderCard(
                color: widget.themeModel.paletteColor,
                date: '1998-09-05',
                title: 'ITEM 1'),
            CustomerDetailHeaderCard(
                color: widget.themeModel.paletteColor,
                date: '2023-04-25',
                title: 'ITEM 2'),
            CustomerDetailHeaderCard(
                color: widget.themeModel.paletteColor,
                date: '2002-12-29',
                title: 'ITEM 3'),
            CustomerDetailHeaderCard(
                color: widget.themeModel.paletteColor,
                date: '2023-04-25',
                title: 'ITEM 4')
          ])
        ]),
        const SizedBox(height: 6),
        Divider(
            color: widget.themeModel.themeData.colorScheme.brightness ==
                    Brightness.dark
                ? const Color.fromRGBO(61, 61, 61, 1)
                : const Color.fromRGBO(238, 238, 238, 1),
            thickness: 3),
        const SizedBox(height: 10),
        Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
          Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            CustomerDetailItem(
                content: 'COMPLETED',
                contentFontColor: widget.themeModel.paletteColor,
                iconColor: widget.themeModel.paletteColor,
                label: 'STATE',
                labelFontColor: widget.themeModel.paletteColor),
            CustomerDetailItem(
                content: 'COMPLETED',
                contentFontColor: widget.themeModel.paletteColor,
                iconColor: widget.themeModel.paletteColor,
                label: 'DATE',
                labelFontColor: widget.themeModel.paletteColor),
            CustomerDetailItem(
                content: '1 / 0 Unit',
                contentFontColor: widget.themeModel.paletteColor,
                iconColor: widget.themeModel.paletteColor,
                label: 'DEVICE',
                labelFontColor: widget.themeModel.paletteColor),
            CustomerDetailItem(
                content: '1 / 0 Unit',
                contentFontColor: widget.themeModel.paletteColor,
                iconColor: widget.themeModel.paletteColor,
                label: 'DEVICE 2',
                labelFontColor: widget.themeModel.paletteColor),
            CustomerDetailItem(
                content: 'KYUNGGI, KOREA',
                contentFontColor: widget.themeModel.paletteColor,
                iconColor: widget.themeModel.paletteColor,
                label: 'ADDRESS',
                labelFontColor: widget.themeModel.paletteColor),
            CustomerDetailItem(
                content: 'Tel. 000-0000-0000',
                contentFontColor: widget.themeModel.paletteColor,
                iconColor: widget.themeModel.paletteColor,
                label: 'CONTACT',
                labelFontColor: widget.themeModel.paletteColor),
          ]),
          Column(children: [
            Row(children: [
              CustomerDetailCard(
                  color: widget.themeModel.paletteColor,
                  title: 'CARD 1',
                  description: 'Extra Data',
                  contentTitle: 'CONTENT TITLE',
                  hasTitleButton: false),
              CustomerDetailCard(
                  color: widget.themeModel.paletteColor,
                  title: 'CARD 2',
                  description: null,
                  contentTitle: 'CONTENT TITLE',
                  hasTitleButton: true)
            ]),
            const SizedBox(height: 5),
            Row(children: [
              CustomerDetailCard(
                  color: widget.themeModel.paletteColor,
                  title: 'CARD 3',
                  description: null,
                  contentTitle: 'CONTENT TITLE',
                  hasTitleButton: false),
              CustomerDetailCard(
                  color: widget.themeModel.paletteColor,
                  title: 'CARD 4',
                  description: null,
                  contentTitle: 'CONTENT TITLE',
                  hasTitleButton: false)
            ])
          ])
        ]),
        CustomerTabBar(tabColor: widget.themeModel.paletteColor)
      ]));

  @override
  getScrollController() => widget.controller;

  @override
  getThemeModel() => widget.themeModel;

  _onAddCustomer() => openEndDrawerUi(widget.parentScaffoldKey);
}
