import 'dart:io';

import 'package:flutter/material.dart';

import '../../../../assets/strings/values.dart';
import '../../../theme/theme_model.dart';
import '../../../../utils/image_util.dart';

class MainContentCard extends StatefulWidget {
  const MainContentCard({Key? key}) : super(key: key);

  @override
  _MainContentCardState createState() => _MainContentCardState();
}

class _MainContentCardState extends State<MainContentCard> {
  ThemeModel model = ThemeModel.instance;
  late double _cardWidth;
  late double _cardHeight;

  @override
  void initState() {
    model.addListener(() => mounted ? setState(() {}) : {});
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return model.isWeb
        ? Scrollbar(thumbVisibility: model.isWeb, child: _getMainContentCards())
        : _getMainContentCards();
  }

  Widget _getMainContentCards() {
    final double deviceWidth = MediaQuery.of(context).size.width;
    double padding;
    double sidePadding = deviceWidth > devWidthBig
        ? deviceWidth * 0.038
        : deviceWidth >= devWidthSmall
            ? deviceWidth * 0.041
            : deviceWidth * 0.05;

    Widget? organizedCardWidget;

    if (deviceWidth > devWidthBig) {
      padding = deviceWidth * 0.011;
      _cardWidth = (deviceWidth * 0.9) / 2;
      _cardHeight = 700;

      if (deviceWidth > devWidthMoreBig) {
        _cardWidth = deviceWidth / 2;
        _cardHeight = 1500;
        sidePadding = (_cardWidth / 2) * 0.125;
        padding = 30;
      }
      final List<Widget> firstColumnWidgets = <Widget>[];
      final List<Widget> secondColumnWidgets = <Widget>[];

      for (int i = 0; i < mainContentCardCount; i++) {
        if (i == 0) {
          firstColumnWidgets.add(_getCardItemWidget());
          firstColumnWidgets
              .add(Padding(padding: EdgeInsets.only(top: padding)));
        } else {
          secondColumnWidgets.add(_getCardItemWidget());
          secondColumnWidgets
              .add(Padding(padding: EdgeInsets.only(top: padding)));
        }
        organizedCardWidget = Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Padding(padding: EdgeInsets.only(left: sidePadding)),
              Column(children: firstColumnWidgets),
              Padding(padding: EdgeInsets.only(left: padding)),
              Column(children: secondColumnWidgets),
              Padding(padding: EdgeInsets.only(left: sidePadding)),
            ]);
      }
    } else if (deviceWidth >= devWidthSmall) {
      padding = deviceWidth * 0.018;
      _cardWidth = (deviceWidth * 0.9) / 2;
      _cardHeight = 700;

      final List<Widget> firstColumnWidgets = <Widget>[];
      final List<Widget> secondColumnWidgets = <Widget>[];

      for (int i = 0; i < mainContentCardCount; i++) {
        if (i == 0) {
          firstColumnWidgets.add(_getCardItemWidget());
          firstColumnWidgets
              .add(Padding(padding: EdgeInsets.only(top: padding)));
        } else {
          secondColumnWidgets.add(_getCardItemWidget());
          secondColumnWidgets
              .add(Padding(padding: EdgeInsets.only(top: padding)));
        }
        organizedCardWidget = Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Padding(padding: EdgeInsets.only(left: sidePadding)),
              Column(children: firstColumnWidgets),
              Padding(padding: EdgeInsets.only(left: padding)),
              Column(children: secondColumnWidgets),
              Padding(padding: EdgeInsets.only(left: sidePadding))
            ]);
      }
    } else {
      _cardWidth = deviceWidth * 0.9;
      _cardHeight = 500;
      padding = deviceWidth * 0.035;
      sidePadding = (deviceWidth * 0.1) / 2;

      final List<Widget> verticalOrderedWidgets = <Widget>[];

      for (int i = 0; i < mainContentCardCount; i++) {
        verticalOrderedWidgets.add(_getCardItemWidget());
        verticalOrderedWidgets
            .add(Padding(padding: EdgeInsets.only(top: padding)));
      }
      organizedCardWidget = Row(children: <Widget>[
        Padding(padding: EdgeInsets.only(left: sidePadding)),
        Column(children: verticalOrderedWidgets),
        Padding(padding: EdgeInsets.only(left: sidePadding))
      ]);
    }

    return SingleChildScrollView(
        child: Container(
            padding: EdgeInsets.only(top: deviceWidth > devWidthBig ? 15 : 10),
            child: organizedCardWidget));
  }

  Widget _getCardItemWidget() {
    return Container(
        padding: const EdgeInsets.only(bottom: 10),
        decoration: BoxDecoration(
            color: model.cardColor,
            border: Border.all(
                color: const Color.fromRGBO(0, 0, 0, 0.12), width: 1.1),
            borderRadius: const BorderRadius.all(Radius.circular(12))),
        width: _cardWidth,
        height: _cardHeight,
        child: Column(children: <Widget>[
          Container(
              padding: const EdgeInsets.only(top: 15, bottom: 2),
              child: Text('CONTENT',
                  style: TextStyle(
                      color: model.backgroundColor,
                      fontSize: 16,
                      fontFamily: 'Roboto-Bold'))),
          Divider(
              color: model.themeData.colorScheme.brightness == Brightness.dark
                  ? const Color.fromRGBO(61, 61, 61, 1)
                  : const Color.fromRGBO(238, 238, 238, 1),
              thickness: 3),
          Column(children: _getDetailCardItemWidgetList())
        ]));
  }

  List<Widget> _getDetailCardItemWidgetList() {
    final List<Widget> items = <Widget>[];

    for (int i = 0; i < cardItemCount; i++) {
      items.add(Container(
          color: model.cardColor,
          child: Material(
              color: model.cardColor,
              child: InkWell(
                  splashFactory: InkRipple.splashFactory,
                  hoverColor: Colors.grey.withOpacity(0.2),
                  child: ListTile(
                      contentPadding: const EdgeInsets.fromLTRB(
                          12, 2, 0, cardItemCount > 3 ? 6 : 0),
                      leading:
                          Image.asset(AllImages.flutterLogo, fit: BoxFit.cover),
                      title: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: <Widget>[
                            Row(children: <Widget>[
                              Text('ITEM',
                                  textAlign: TextAlign.left,
                                  softWrap: true,
                                  textScaleFactor: 1,
                                  overflow: TextOverflow.fade,
                                  style: TextStyle(
                                      fontSize: 12,
                                      letterSpacing: 0.1,
                                      color: model.textColor,
                                      fontFamily: 'Roboto-Bold')),
                              if (!model.isWebFullView && Platform.isIOS)
                                Container()
                            ]),
                            Container(
                                decoration: const BoxDecoration(
                                    color: Color.fromRGBO(55, 153, 30, 1),
                                    borderRadius: BorderRadius.only(
                                        topRight: Radius.circular(5),
                                        bottomRight: Radius.circular(5),
                                        topLeft: Radius.circular(5),
                                        bottomLeft: Radius.circular(5))),
                                padding: model.isWeb && model.isMobileResolution
                                    ? const EdgeInsets.fromLTRB(6, 1.5, 6, 5.5)
                                    : const EdgeInsets.fromLTRB(6, 2.7, 6, 2.7),
                                margin: model.isWeb && model.isMobileResolution
                                    ? const EdgeInsets.fromLTRB(0, 0, 6, 0)
                                    : const EdgeInsets.fromLTRB(0, 0, 6, 0),
                                child: const Text('ITEM',
                                    style: TextStyle(
                                        fontFamily: 'Roboto-Medium',
                                        color: Colors.white,
                                        fontSize: 10.5)))
                          ]),
                      subtitle: const Padding(
                          padding: EdgeInsets.fromLTRB(0.0, 7.0, 12.0, 0.0),
                          child: Text('DESCRIPTION',
                              textAlign: TextAlign.left,
                              softWrap: true,
                              textScaleFactor: 1,
                              overflow: TextOverflow.fade,
                              style: TextStyle(
                                  fontWeight: FontWeight.normal,
                                  fontSize: 12,
                                  color:
                                      Color.fromRGBO(128, 128, 128, 1)))))))));
    }
    return items;
  }
}
