import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import 'package:flutter_web_navigation/presentation/components/button/custom_normal_button.dart';
import 'package:flutter_web_navigation/presentation/components/datagrid/datagrid_paging.dart';
import 'package:flutter_web_navigation/presentation/components/input_box/custom_input_box.dart';
import 'package:flutter_web_navigation/presentation/container/components/search/search_input_bar.dart';

import '../../../../assets/strings/values.dart';
import '../../../theme/theme_model.dart';

class MainContent extends StatefulWidget {
  final String routeName;
  final Widget leftTopContent;
  final Widget rightTopContent;
  final Widget rightCardContent;
  final ScrollController scrollController;
  const MainContent(
      {Key? key,
      required this.routeName,
      required this.leftTopContent,
      required this.rightTopContent,
      required this.rightCardContent,
      required this.scrollController})
      : super(key: key);

  @override
  _MainContentState createState() => _MainContentState();
}

class _MainContentState extends State<MainContent> {
  ThemeModel model = ThemeModel.instance;
  late double _cardWidth;
  late double padding;
  late double sidePadding;
  late double deviceWidth;

  @override
  void initState() {
    model.addListener(() => mounted ? setState(() {}) : {});
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    deviceWidth = MediaQuery.of(context).size.width;
    return Scrollbar(thumbVisibility: true, child: _getMainContent());
  }

  String calculateLayoutSize() {
    sidePadding = deviceWidth > devWidthBig
        ? deviceWidth * 0.038
        : deviceWidth >= devWidthSmall
            ? deviceWidth * 0.041
            : deviceWidth * 0.05;

    // web page size with large screen size
    if (deviceWidth > devWidthBig) {
      padding = deviceWidth > devWidthMoreBig ? 30 : deviceWidth * 0.011;
      sidePadding = deviceWidth > devWidthMoreBig
          ? (_cardWidth / 2) * 0.125
          : sidePadding;
      _cardWidth = deviceWidth > devWidthMoreBig
          ? deviceWidth / 2
          : (deviceWidth * 0.9) / 2;
      _cardWidth = _isSoloCard() ? _cardWidth * 2 : _cardWidth;
      return web_big_size;

      // web page size for medium screen size
    } else if (deviceWidth >= devWidthSmall) {
      _cardWidth = (deviceWidth * 0.9) / 2;
      _cardWidth = _isSoloCard() ? _cardWidth * 2 : _cardWidth;
      padding = deviceWidth * 0.018;
      return web_mid_size;

      // mobile size
    } else {
      _cardWidth = deviceWidth * 0.9;
      padding = deviceWidth * 0.035;
      sidePadding = (deviceWidth * 0.1) / 2;
      return mobile_size;
    }
  }

  Widget _getOrganizedWidget() {
    Widget? organizedCardWidget;
    switch (calculateLayoutSize()) {
      case web_big_size:
      case web_mid_size:
        organizedCardWidget = _getWebOrganizedWidget(padding, sidePadding);
        break;
      case mobile_size:
        organizedCardWidget = _getMobileOrganizedWidget(padding, sidePadding);
    }
    return organizedCardWidget ?? Container();
  }

  Widget _getMainContent() {
    return model.isMobileResolution
        ? SingleChildScrollView(
            child: Container(
                padding:
                    EdgeInsets.only(top: deviceWidth > devWidthBig ? 15 : 10),
                child: _getOrganizedWidget()))
        : Container(
            transform: Matrix4.translationValues(0, -1, 0),
            child: Scrollbar(
                controller: widget.scrollController,
                thumbVisibility: true,
                child: CustomScrollView(
                    controller: widget.scrollController,
                    physics: const ClampingScrollPhysics(),
                    slivers: <Widget>[
                      SliverList(
                          delegate: SliverChildListDelegate(<Widget>[
                        Column(children: <Widget>[
                          SingleChildScrollView(
                              child: Container(
                                  padding: EdgeInsets.only(
                                      top: deviceWidth > devWidthBig ? 15 : 10),
                                  child: _getOrganizedWidget()))
                        ])
                      ]))
                    ])));
  }

  _getMobileOrganizedWidget(padding, sidePadding) {
    final List<Widget> verticalOrderedWidgets = <Widget>[];

    verticalOrderedWidgets.add(_getLeftCardItemWidget());
    if (!_isSoloCard()) {
      verticalOrderedWidgets.add(_getRightCardItemWidget());
    }
    verticalOrderedWidgets.add(Padding(padding: EdgeInsets.only(top: padding)));

    return Row(children: <Widget>[
      Padding(padding: EdgeInsets.only(left: sidePadding)),
      Column(children: verticalOrderedWidgets),
      Padding(padding: EdgeInsets.only(left: sidePadding))
    ]);
  }

  _getWebOrganizedWidget(padding, sidePadding) {
    final List<Widget> firstColumnWidgets = <Widget>[];
    final List<Widget> secondColumnWidgets = <Widget>[];

    firstColumnWidgets.add(_getLeftCardItemWidget());
    firstColumnWidgets.add(Padding(padding: EdgeInsets.only(top: padding)));

    if (!_isSoloCard()) {
      secondColumnWidgets.add(_getRightCardItemWidget());
      secondColumnWidgets.add(Padding(padding: EdgeInsets.only(top: padding)));
      return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Padding(padding: EdgeInsets.only(left: sidePadding)),
            Column(children: firstColumnWidgets),
            Padding(padding: EdgeInsets.only(left: padding)),
            Column(children: secondColumnWidgets),
            Padding(padding: EdgeInsets.only(left: sidePadding))
          ]);
    } else {
      return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Padding(padding: EdgeInsets.only(left: sidePadding)),
            Column(children: firstColumnWidgets),
            Padding(padding: EdgeInsets.only(left: sidePadding))
          ]);
    }
  }

  _getDivider() {
    return Divider(
        color: model.themeData.colorScheme.brightness == Brightness.dark
            ? const Color.fromRGBO(61, 61, 61, 1)
            : const Color.fromRGBO(238, 238, 238, 1),
        thickness: 2);
  }

  _getHeaderItem(String headerTitle) => Container(
      alignment: Alignment.center,
      height: 35,
      child: Text(headerTitle,
          style: const TextStyle(
              color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)));

  _getItem(String itemTitle) => Container(
      alignment: Alignment.center,
      width: 50,
      height: 35,
      child: Text(itemTitle,
          style: TextStyle(
              color: model.paletteColor,
              fontSize: 14,
              fontWeight: FontWeight.w600)));

  _getInventoryHeader() => Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            _getHeaderItem('HEADER1'),
            _getHeaderItem('HEADER2'),
            _getHeaderItem('HEADER3'),
            _getHeaderItem('HEADER4'),
            _getHeaderItem('HEADER5'),
            _getHeaderItem('HEADER6'),
            _getHeaderItem('HEADER7')
          ]);

  _getInventoryItem() => Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            _getItem('ITEM1'),
            _getItem('0'),
            _getItem('0'),
            _getItem('0'),
            _getItem('0'),
            _getItem('0'),
            _getItem('0')
          ]);

  _getInventoryItem2() => Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            _getItem('ITEM2'),
            _getItem('0'),
            _getItem('0'),
            _getItem('0'),
            _getItem('0'),
            _getItem('0'),
            _getItem('0')
          ]);

  _getInventoryContainer() => Container(
      margin: const EdgeInsets.only(top: 5, bottom: 5),
      padding: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
          color: model.cardColor,
          border: Border.all(
              color: const Color.fromRGBO(0, 0, 0, 0.12), width: 1.1),
          borderRadius: const BorderRadius.all(Radius.circular(12))),
      width: _cardWidth,
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
                height: 45,
                decoration: BoxDecoration(
                    color: model.paletteColor,
                    border: Border.all(
                        color: const Color.fromRGBO(0, 0, 0, 0.12), width: 1.1),
                    borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(12),
                        topRight: Radius.circular(12))),
                child: _getInventoryHeader()),
            SizedBox(height: 42, child: _getInventoryItem()),
            _getDivider(),
            SizedBox(height: 30, child: _getInventoryItem2())
          ]));

  _getAccountingSearchFilterContainer() => Container(
      alignment: Alignment.centerLeft,
      height: 100,
      padding: const EdgeInsets.all(10),
      child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
                alignment: Alignment.center,
                child: CustomInputBox(
                    placeHolder: '01/1998',
                    focusedPlaceHolder: '01/1998',
                    errorMessage: '',
                    isPassword: false,
                    themeColor: model.paletteColor)),
            Container(
                alignment: Alignment.center,
                child: Icon(Icons.check_circle_rounded,
                    color: model.paletteColor, size: 60)),
            Text('~',
                style: TextStyle(
                    color: model.paletteColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 15)),
            CustomInputBox(
                placeHolder: '01/1998',
                focusedPlaceHolder: '01/1998',
                errorMessage: '',
                isPassword: false,
                themeColor: model.paletteColor),
            Icon(Icons.check_circle_rounded,
                color: model.paletteColor, size: 30),
            CustomInputBox(
                placeHolder: 'FILTER 1',
                focusedPlaceHolder: 'FILTER 1',
                errorMessage: '',
                isPassword: false,
                themeColor: model.paletteColor),
            Container(
                alignment: Alignment.center,
                child: CustomInputBox(
                    placeHolder: 'FILTER 2',
                    focusedPlaceHolder: 'FILTER 2',
                    errorMessage: '',
                    isPassword: false,
                    themeColor: model.paletteColor)),
            CustomNormalButton(
                buttonText: 'CLEAR',
                callback: () {},
                backgroundColor: model.paletteColor,
                height: 50,
                width: 100,
                fontSize: 15)
          ]));

  _getLeftCardItemWidget() {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      SizedBox(width: _cardWidth, child: widget.leftTopContent),
      widget.routeName == routeKeyInventory
          ? _getInventoryContainer()
          : Container(),
      Container(
          padding: const EdgeInsets.only(bottom: 10),
          decoration: BoxDecoration(
              color: model.cardColor,
              border: Border.all(
                  color: const Color.fromRGBO(0, 0, 0, 0.12), width: 1.1),
              borderRadius: const BorderRadius.all(Radius.circular(12))),
          width: _cardWidth,
          child: Column(children: <Widget>[
            _hasSearchInputBar()
                ? SearchInputBar(cardWidth: _cardWidth)
                : widget.routeName == routeKeyQna
                    ? Container(
                        padding: const EdgeInsets.only(top: 18, bottom: 18),
                        alignment: Alignment.center,
                        child: Text(widget.routeName.toUpperCase(),
                            style: TextStyle(
                                color: model.backgroundColor,
                                fontSize: 25,
                                fontFamily: 'Roboto-Bold')))
                    : widget.routeName == routeKeyAccounting
                        ? _getAccountingSearchFilterContainer()
                        : const SizedBox(height: 5),
            _hasSearchInputBar()
                ? Divider(
                    color: model.themeData.colorScheme.brightness ==
                            Brightness.dark
                        ? const Color.fromRGBO(61, 61, 61, 1)
                        : const Color.fromRGBO(238, 238, 238, 1),
                    thickness: 3)
                : const SizedBox(height: 5),
            Column(children: [
              PagingDataGrid(cardWidth: _cardWidth, isSoloCard: _isSoloCard())
            ])
          ]))
    ]);
  }

  _getRightCardItemWidget() {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      SizedBox(width: _cardWidth, child: widget.rightTopContent),
      Container(
          padding: const EdgeInsets.only(bottom: 10),
          decoration: BoxDecoration(
              color: model.cardColor,
              border: Border.all(
                  color: const Color.fromRGBO(0, 0, 0, 0.12), width: 1.1),
              borderRadius: const BorderRadius.all(Radius.circular(12))),
          width: _cardWidth,
          child: Column(children: <Widget>[
            Container(
                padding: const EdgeInsets.only(top: 18, bottom: 18),
                alignment: Alignment.center,
                child: Text(widget.routeName.toUpperCase(),
                    style: TextStyle(
                        color: model.backgroundColor,
                        fontSize: 16,
                        fontFamily: 'Roboto-Bold'))),
            Divider(
                color: model.themeData.colorScheme.brightness == Brightness.dark
                    ? const Color.fromRGBO(61, 61, 61, 1)
                    : const Color.fromRGBO(238, 238, 238, 1),
                thickness: 3),
            Column(children: [widget.rightCardContent])
          ]))
    ]);
  }

  _hasSearchInputBar() =>
      widget.routeName != routeKeyAccounting &&
      widget.routeName != routeKeyEvents &&
      widget.routeName != routeKeyQna;

  _isSoloCard() =>
      widget.routeName == routeKeyAccounting ||
      widget.routeName == routeKeyEvents;
}
