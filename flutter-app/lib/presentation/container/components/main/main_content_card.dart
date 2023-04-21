import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/components/datagrid/datagrid_paging.dart';

import '../../../../assets/strings/strings.dart';
import '../../../../assets/strings/values.dart';
import '../../../theme/theme_model.dart';
import '../../../../utils/image_util.dart';

class MainContentCard extends StatefulWidget {
  final String routeName;
  const MainContentCard({Key? key, required this.routeName}) : super(key: key);

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
          firstColumnWidgets.add(_getCardItemWidget(true));
          firstColumnWidgets
              .add(Padding(padding: EdgeInsets.only(top: padding)));
        } else {
          secondColumnWidgets.add(_getCardItemWidget(false));
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
          firstColumnWidgets.add(_getCardItemWidget(true));
          firstColumnWidgets
              .add(Padding(padding: EdgeInsets.only(top: padding)));
        } else {
          secondColumnWidgets.add(_getCardItemWidget(false));
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
        if (i == 0) {
          verticalOrderedWidgets.add(_getCardItemWidget(true));
        } else {
          verticalOrderedWidgets.add(_getCardItemWidget(false));
        }
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

  Widget _getCardItemWidget(bool? isLeftCard) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Container(
          padding: const EdgeInsets.only(bottom: 10),
          decoration: BoxDecoration(
              color: model.cardColor,
              border: Border.all(
                  color: const Color.fromRGBO(0, 0, 0, 0.12), width: 1.1),
              borderRadius: const BorderRadius.all(Radius.circular(12))),
          width: _cardWidth,
          height: _cardHeight,
          child: Column(children: <Widget>[
            isLeftCard == true
                ? Container(
                    width: _cardWidth - 50,
                    margin: const EdgeInsets.only(top: 6),
                    child: TextField(
                      keyboardType: TextInputType.text,
                      onChanged: (value) {},
                      decoration: const InputDecoration(
                          hintText: searchBoxHintText,
                          border: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                              borderSide: BorderSide(style: BorderStyle.solid)),
                          suffixIcon: Padding(
                              padding: EdgeInsets.only(right: 15),
                              child: Icon(Icons.search))),
                    ))
                : Container(
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
            Column(children: _getDetailCardItemWidgetList(isLeftCard))
          ]))
    ]);
  }

  Widget _getDetailDefaultCardItemWidget() {
    return Container(
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
                        Image.asset(AllImages.adminLogo, fit: BoxFit.cover),
                    title: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Row(children: <Widget>[
                            Text(widget.routeName.toUpperCase(),
                                textAlign: TextAlign.left,
                                softWrap: true,
                                textScaleFactor: 1,
                                overflow: TextOverflow.fade,
                                style: TextStyle(
                                    fontSize: 12,
                                    letterSpacing: 0.1,
                                    color: model.paletteColor,
                                    fontFamily: 'Roboto-Bold')),
                            if (!model.isWebFullView && Platform.isIOS)
                              Container()
                          ]),
                          Container(
                              decoration: BoxDecoration(
                                  color: model.backgroundColor,
                                  borderRadius: const BorderRadius.only(
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
                              child: const Text('UI',
                                  style: TextStyle(
                                      fontFamily: 'Roboto-Medium',
                                      color: Colors.white,
                                      fontSize: 10.5)))
                        ]),
                    subtitle: Padding(
                        padding: const EdgeInsets.fromLTRB(0.0, 7.0, 12.0, 0.0),
                        child: Text(
                            widget.routeName.toUpperCase() + 'DESCRIPTION',
                            textAlign: TextAlign.left,
                            softWrap: true,
                            textScaleFactor: 1,
                            overflow: TextOverflow.fade,
                            style: const TextStyle(
                                fontWeight: FontWeight.normal,
                                fontSize: 12,
                                color: Color.fromRGBO(128, 128, 128, 1))))))));
  }

  List<Widget> _getDetailCardItemWidgetList(bool? isLeftCard) {
    final List<Widget> items = <Widget>[];
    if (isLeftCard == true) {
      items.add(Container(
          color: model.cardColor,
          child:
              PagingDataGrid(cardWidth: _cardWidth, cardHeight: _cardHeight)));
      return items;
    }
    for (int i = 0; i < cardItemCount; i++) {
      items.add(_getDetailDefaultCardItemWidget());
    }
    return items;
  }
}
