import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import 'package:flutter_web_navigation/presentation/components/datagrid/datagrid_paging.dart';
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

  _getLeftCardItemWidget() {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      SizedBox(width: _cardWidth, child: widget.leftTopContent),
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
