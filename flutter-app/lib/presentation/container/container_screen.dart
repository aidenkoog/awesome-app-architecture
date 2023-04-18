import 'dart:async';
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core.dart';

// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;

import '../../services/hive_storage_service.dart';
import '../../temp/animate_opacity_widget.dart';
import '../../temp/helper.dart';
import '../../temp/model.dart';

class ContainerScreen extends StatefulWidget {
  final String routeName;
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey();
  final ScrollController controller = ScrollController();

  ContainerScreen({
    Key? key,
    required this.routeName,
  }) : super(key: key);

  @override
  State<ContainerScreen> createState() => _ContainerScreenState();
}

class _ContainerScreenState extends State<ContainerScreen> {
  Widget? render;
  bool isLoading = false;
  late SampleModel sampleListModel;

  @override
  void initState() {
    sampleListModel = SampleModel.instance;
    _addColors();
    sampleListModel.addListener(_handleChange);
    super.initState();
  }

  ///Notify the framework by calling this method
  void _handleChange() {
    if (mounted) {
      setState(() {
        // The listenable's state was changed already.
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    bool isHoveringCustomerButton = false;
    bool isHoveringInventoryButton = false;
    bool isHoveringAgencyButton = false;
    bool isHoveringAccountingButton = false;
    bool isHoveringEventsButton = false;
    bool isHoveringQnaButton = false;

    final bool isMaxxSize = MediaQuery.of(context).size.width >= 1500;
    final SampleModel model = sampleListModel;
    model.isMobileResolution = (MediaQuery.of(context).size.width) < 1300; //76

    return SafeArea(
        child: model.isMobileResolution
            ? Scaffold(
                resizeToAvoidBottomInset: false,
                drawer: (!model.isWebFullView && Platform.isIOS)
                    ? null
                    : getLeftSideDrawer(model),
                key: widget._scaffoldKey,
                backgroundColor: model.webBackgroundColor,
                endDrawerEnableOpenDragGesture: false,
                endDrawer:
                    model.isWebFullView ? showWebThemeSettings(model) : null,
                appBar: PreferredSize(
                    preferredSize: const Size.fromHeight(46.0),
                    child: AppBar(
                      leading: (!model.isWebFullView && Platform.isIOS)
                          ? Container()
                          : null,
                      elevation: 0.0,
                      backgroundColor: model.paletteColor,
                      title: AnimateOpacityWidget(
                          controller: widget.controller,
                          opacity: 0,
                          child: const Text(
                              'Admin System by AidenKooG (Mobile)',
                              style: TextStyle(
                                  fontSize: 18, fontFamily: 'HeeboMedium'))),
                      actions: <Widget>[
                        SizedBox(
                          height: 40,
                          width: 40,
                          child: IconButton(
                            icon:
                                const Icon(Icons.settings, color: Colors.white),
                            onPressed: () {
                              widget._scaffoldKey.currentState!.openEndDrawer();
                            },
                          ),
                        ),
                      ],
                    )),
                body: Container(
                    transform: Matrix4.translationValues(0, -1, 0),
                    child: _getScrollableWidget(model)))
            : Scaffold(
                bottomNavigationBar: getFooter(context, model),
                key: widget._scaffoldKey,
                backgroundColor: model.webBackgroundColor,
                endDrawerEnableOpenDragGesture: false,
                endDrawer: showWebThemeSettings(model),
                resizeToAvoidBottomInset: false,
                appBar: PreferredSize(
                    preferredSize: const Size.fromHeight(90.0),
                    child: AppBar(
                      leading: Container(),
                      elevation: 0.0,
                      backgroundColor: model.paletteColor,
                      flexibleSpace: Container(
                          transform: Matrix4.translationValues(0, 4, 0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              const Padding(
                                padding: EdgeInsets.fromLTRB(24, 10, 0, 0),
                                child: Text('Admin System by AidenKooG ',
                                    style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 28,
                                        letterSpacing: 0.53,
                                        fontFamily: 'Roboto-Bold')),
                              ),
                              const Padding(
                                  padding: EdgeInsets.fromLTRB(24, 0, 0, 0),
                                  child: Text('Portal . Debugging version',
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 14,
                                          fontFamily: 'Roboto-Regular',
                                          letterSpacing: 0.26,
                                          fontWeight: FontWeight.normal))),
                              const Padding(
                                padding: EdgeInsets.only(top: 15),
                              ),
                              Container(
                                  alignment: Alignment.bottomCenter,
                                  width: double.infinity,
                                  height: kIsWeb ? 16 : 14,
                                  decoration: BoxDecoration(
                                      color: model.webBackgroundColor,
                                      borderRadius: const BorderRadius.only(
                                          topLeft: Radius.circular(12.0),
                                          topRight: Radius.circular(12.0)),
                                      boxShadow: <BoxShadow>[
                                        BoxShadow(
                                          color: model.webBackgroundColor,
                                          offset: const Offset(0, 2.0),
                                          blurRadius: 0.25,
                                        )
                                      ]))
                            ],
                          )),
                      actions: <Widget>[
                        if (MediaQuery.of(context).size.width < 500)
                          const SizedBox(height: 0, width: 9)
                        else

                        ///download option
                        if (model.isMobileResolution)
                          Container()
                        else
                          Container(
                              alignment: Alignment.center,
                              padding: EdgeInsets.only(
                                  top: 10, left: isMaxxSize ? 20 : 0),
                              child: Container(
                                  width: 115,
                                  height: 32,
                                  decoration: BoxDecoration(
                                      border: Border.all(color: Colors.white)),
                                  child: StatefulBuilder(builder:
                                      (BuildContext context,
                                          StateSetter setState) {
                                    return MouseRegion(
                                      onHover: (PointerHoverEvent event) {
                                        isHoveringCustomerButton = true;
                                        setState(() {});
                                      },
                                      onExit: (PointerExitEvent event) {
                                        isHoveringCustomerButton = false;
                                        setState(() {});
                                      },
                                      child: InkWell(
                                        hoverColor: Colors.white,
                                        onTap: () {},
                                        child: Padding(
                                          padding: const EdgeInsets.fromLTRB(
                                              8, 9, 8, 9),
                                          child: Text('CUSTOMER',
                                              textAlign: TextAlign.center,
                                              style: TextStyle(
                                                  color:
                                                      isHoveringCustomerButton
                                                          ? model.paletteColor
                                                          : Colors.white,
                                                  fontSize: 12,
                                                  fontWeight:
                                                      isHoveringCustomerButton
                                                          ? FontWeight.bold
                                                          : FontWeight.normal,
                                                  fontFamily: 'Roboto-Medium')),
                                        ),
                                      ),
                                    );
                                  }))),

                        ///download option
                        if (model.isMobileResolution)
                          Container()
                        else
                          Container(
                              alignment: Alignment.center,
                              padding: EdgeInsets.only(
                                  top: 10, left: isMaxxSize ? 20 : 0),
                              child: Container(
                                  width: 115,
                                  height: 32,
                                  decoration: BoxDecoration(
                                      border: Border.all(color: Colors.white)),
                                  child: StatefulBuilder(builder:
                                      (BuildContext context,
                                          StateSetter setState) {
                                    return MouseRegion(
                                      onHover: (PointerHoverEvent event) {
                                        isHoveringInventoryButton = true;
                                        setState(() {});
                                      },
                                      onExit: (PointerExitEvent event) {
                                        isHoveringInventoryButton = false;
                                        setState(() {});
                                      },
                                      child: InkWell(
                                        hoverColor: Colors.white,
                                        onTap: () {},
                                        child: Padding(
                                          padding: const EdgeInsets.fromLTRB(
                                              8, 9, 8, 9),
                                          child: Text('INVENTORY',
                                              textAlign: TextAlign.center,
                                              style: TextStyle(
                                                  color:
                                                      isHoveringInventoryButton
                                                          ? model.paletteColor
                                                          : Colors.white,
                                                  fontSize: 12,
                                                  fontWeight:
                                                      isHoveringInventoryButton
                                                          ? FontWeight.bold
                                                          : FontWeight.normal,
                                                  fontFamily: 'Roboto-Medium')),
                                        ),
                                      ),
                                    );
                                  }))),

                        ///download option
                        if (model.isMobileResolution)
                          Container()
                        else
                          Container(
                              alignment: Alignment.center,
                              padding: EdgeInsets.only(
                                  top: 10, left: isMaxxSize ? 20 : 0),
                              child: Container(
                                  width: 115,
                                  height: 32,
                                  decoration: BoxDecoration(
                                      border: Border.all(color: Colors.white)),
                                  child: StatefulBuilder(builder:
                                      (BuildContext context,
                                          StateSetter setState) {
                                    return MouseRegion(
                                      onHover: (PointerHoverEvent event) {
                                        isHoveringAgencyButton = true;
                                        setState(() {});
                                      },
                                      onExit: (PointerExitEvent event) {
                                        isHoveringAgencyButton = false;
                                        setState(() {});
                                      },
                                      child: InkWell(
                                        hoverColor: Colors.white,
                                        onTap: () {},
                                        child: Padding(
                                          padding: const EdgeInsets.fromLTRB(
                                              8, 9, 8, 9),
                                          child: Text('AGENCY',
                                              textAlign: TextAlign.center,
                                              style: TextStyle(
                                                  color: isHoveringAgencyButton
                                                      ? model.paletteColor
                                                      : Colors.white,
                                                  fontSize: 12,
                                                  fontWeight:
                                                      isHoveringAgencyButton
                                                          ? FontWeight.bold
                                                          : FontWeight.normal,
                                                  fontFamily: 'Roboto-Medium')),
                                        ),
                                      ),
                                    );
                                  }))),

                        ///download option
                        if (model.isMobileResolution)
                          Container()
                        else
                          Container(
                              alignment: Alignment.center,
                              padding: EdgeInsets.only(
                                  top: 10, left: isMaxxSize ? 20 : 0),
                              child: Container(
                                  width: 115,
                                  height: 32,
                                  decoration: BoxDecoration(
                                      border: Border.all(color: Colors.white)),
                                  child: StatefulBuilder(builder:
                                      (BuildContext context,
                                          StateSetter setState) {
                                    return MouseRegion(
                                      onHover: (PointerHoverEvent event) {
                                        isHoveringAccountingButton = true;
                                        setState(() {});
                                      },
                                      onExit: (PointerExitEvent event) {
                                        isHoveringAccountingButton = false;
                                        setState(() {});
                                      },
                                      child: InkWell(
                                        hoverColor: Colors.white,
                                        onTap: () {},
                                        child: Padding(
                                          padding: const EdgeInsets.fromLTRB(
                                              8, 9, 8, 9),
                                          child: Text('ACCOUNTING',
                                              textAlign: TextAlign.center,
                                              style: TextStyle(
                                                  color:
                                                      isHoveringAccountingButton
                                                          ? model.paletteColor
                                                          : Colors.white,
                                                  fontSize: 12,
                                                  fontWeight:
                                                      isHoveringAccountingButton
                                                          ? FontWeight.bold
                                                          : FontWeight.normal,
                                                  fontFamily: 'Roboto-Medium')),
                                        ),
                                      ),
                                    );
                                  }))),

                        ///download option
                        if (model.isMobileResolution)
                          Container()
                        else
                          Container(
                              alignment: Alignment.center,
                              padding: EdgeInsets.only(
                                  top: 10, left: isMaxxSize ? 20 : 0),
                              child: Container(
                                  width: 115,
                                  height: 32,
                                  decoration: BoxDecoration(
                                      border: Border.all(color: Colors.white)),
                                  child: StatefulBuilder(builder:
                                      (BuildContext context,
                                          StateSetter setState) {
                                    return MouseRegion(
                                      onHover: (PointerHoverEvent event) {
                                        isHoveringEventsButton = true;
                                        setState(() {});
                                      },
                                      onExit: (PointerExitEvent event) {
                                        isHoveringEventsButton = false;
                                        setState(() {});
                                      },
                                      child: InkWell(
                                        hoverColor: Colors.white,
                                        onTap: () {},
                                        child: Padding(
                                          padding: const EdgeInsets.fromLTRB(
                                              8, 9, 8, 9),
                                          child: Text('EVENTS',
                                              textAlign: TextAlign.center,
                                              style: TextStyle(
                                                  color: isHoveringEventsButton
                                                      ? model.paletteColor
                                                      : Colors.white,
                                                  fontSize: 12,
                                                  fontWeight:
                                                      isHoveringEventsButton
                                                          ? FontWeight.bold
                                                          : FontWeight.normal,
                                                  fontFamily: 'Roboto-Medium')),
                                        ),
                                      ),
                                    );
                                  }))),

                        ///download option
                        if (model.isMobileResolution)
                          Container()
                        else
                          Container(
                              alignment: Alignment.center,
                              padding: EdgeInsets.only(
                                  top: 10, left: isMaxxSize ? 20 : 0),
                              child: Container(
                                  width: 115,
                                  height: 32,
                                  decoration: BoxDecoration(
                                      border: Border.all(color: Colors.white)),
                                  child: StatefulBuilder(builder:
                                      (BuildContext context,
                                          StateSetter setState) {
                                    return MouseRegion(
                                      onHover: (PointerHoverEvent event) {
                                        isHoveringQnaButton = true;
                                        setState(() {});
                                      },
                                      onExit: (PointerExitEvent event) {
                                        isHoveringQnaButton = false;
                                        setState(() {});
                                      },
                                      child: InkWell(
                                        hoverColor: Colors.white,
                                        onTap: () {},
                                        child: Padding(
                                          padding: const EdgeInsets.fromLTRB(
                                              8, 9, 8, 9),
                                          child: Text('Q&A',
                                              textAlign: TextAlign.center,
                                              style: TextStyle(
                                                  color: isHoveringQnaButton
                                                      ? model.paletteColor
                                                      : Colors.white,
                                                  fontSize: 12,
                                                  fontWeight:
                                                      isHoveringQnaButton
                                                          ? FontWeight.bold
                                                          : FontWeight.normal,
                                                  fontFamily: 'Roboto-Medium')),
                                        ),
                                      ),
                                    );
                                  }))),

                        ///Get package from pub.dev option
                        if (model.isMobileResolution)
                          Container()
                        else
                          Container(
                              alignment: Alignment.center,
                              padding: EdgeInsets.only(
                                  top: 10, left: isMaxxSize ? 25 : 12),
                              child: SizedBox(
                                  height: 32,
                                  child: StatefulBuilder(builder:
                                      (BuildContext context,
                                          StateSetter setState) {
                                    return Padding(
                                      padding:
                                          const EdgeInsets.fromLTRB(0, 7, 8, 7),
                                      child: Row(children: const <Widget>[
                                        Text('Logout: 100H 59M 59S',
                                            textAlign: TextAlign.center,
                                            style: TextStyle(
                                                color: Colors.white,
                                                fontSize: 12,
                                                fontFamily: 'Roboto-Medium')),
                                      ]),
                                    );
                                  }))),
                        Padding(
                            padding: EdgeInsets.only(left: isMaxxSize ? 15 : 0),
                            child: Container(
                              padding: MediaQuery.of(context).size.width < 500
                                  ? const EdgeInsets.only(top: 20, left: 5)
                                  : const EdgeInsets.only(top: 10, right: 15),
                              height: 60,
                              width: 60,
                              child: IconButton(
                                icon: const Icon(Icons.supervised_user_circle,
                                    color: Colors.white),
                                onPressed: () {},
                              ),
                            )),
                        Padding(
                            padding: EdgeInsets.only(left: isMaxxSize ? 15 : 0),
                            child: Container(
                              padding: MediaQuery.of(context).size.width < 500
                                  ? const EdgeInsets.only(top: 20, left: 5)
                                  : const EdgeInsets.only(top: 10, right: 15),
                              height: 60,
                              width: 60,
                              child: IconButton(
                                icon: const Icon(Icons.settings,
                                    color: Colors.white),
                                onPressed: () {
                                  widget._scaffoldKey.currentState!
                                      .openEndDrawer();
                                },
                              ),
                            )),
                      ],
                    )),
                body: _CategorizedCards()));
  }

  // handler for tab item click event.
  onTabItemPressed(String routeName) {
    setState(() {
      isLoading = true;
    });
    Timer(const Duration(seconds: 1), () async {
      setState(() {
        isLoading = false;
      });
      AppRouterDelegate().setPathName(routeName);
    });
  }

  // handler for web page title click event.
  onClickWebPageTitle() {
    html.window.location.reload();
  }

  // handler for popup menu events.
  onHandlePopupMenuItemEvent(Object? value) {
    int selectedItemValue = value as int;
    switch (selectedItemValue) {
      case 3:
        _logOut();
        break;
      default:
        break;
    }
  }

  // logout user and go back to intro screen.
  // internally user is deleted from hive repository.
  _logOut() async {
    setState(() {
      isLoading = true;
    });
    Timer(const Duration(seconds: 1), () async {
      setState(() {
        isLoading = false;
      });
      await HiveDataStorageService.logOutUser();
      AppRouterDelegate().setPathName(RouteData.intro.name, loggedIn: false);
    });
  }

  // Get scrollable widget to getting stickable view with scrollbar depends on platform
  Widget _getScrollableWidget(SampleModel model) {
    return model.isWeb
        ? Scrollbar(
            controller: widget.controller,
            thumbVisibility: true,
            child: _getCustomScrollWidget(model))
        : _getCustomScrollWidget(model);
  }

  // Get scrollable widget to getting stickable view
  Widget _getCustomScrollWidget(SampleModel model) {
    return Container(
        color: model.paletteColor,
        child: GlowingOverscrollIndicator(
            color: model.paletteColor,
            axisDirection: AxisDirection.down,
            child: CustomScrollView(
              controller: widget.controller,
              physics: const ClampingScrollPhysics(),
              slivers: <Widget>[
                SliverToBoxAdapter(
                    child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    const Padding(
                      padding: EdgeInsets.fromLTRB(20, 0, 0, 0),
                      child: Text('Admin System by AidenKooG (Mobile)',
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 25,
                              letterSpacing: 0.53,
                              fontFamily: 'HeeboBold',
                              fontWeight: FontWeight.bold)),
                    ),
                    // ignore: prefer_const_constructors
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 8, 0, 0),
                      child: const Text('Portal . Debugging version',
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 14,
                              letterSpacing: 0.26,
                              fontFamily: 'HeeboBold',
                              fontWeight: FontWeight.normal)),
                    ),
                    Row(
                      // ignore: prefer_const_literals_to_create_immutables
                      children: [
                        const Padding(
                          padding: EdgeInsets.fromLTRB(20, 8, 0, 0),
                          child: Text('Logout: 100H 59M 59S',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 14,
                                  letterSpacing: 0.26,
                                  fontFamily: 'HeeboBold',
                                  fontWeight: FontWeight.normal)),
                        ),
                        const Padding(
                          padding: EdgeInsets.fromLTRB(8, 8, 0, 0),
                          child: Icon(
                            Icons.supervised_user_circle,
                            color: Colors.white,
                          ),
                        )
                      ],
                    ),
                  ],
                )),
                SliverPersistentHeader(
                  pinned: true,
                  delegate: _PersistentHeaderDelegate(model),
                ),
                SliverList(
                  delegate: SliverChildListDelegate(<Widget>[
                    Container(
                        color: model.webBackgroundColor,
                        child: _CategorizedCards()),
                  ]),
                )
              ],
            )));
  }

  // Add the palette colors
  void _addColors() {
    sampleListModel.paletteColors = <Color>[
      const Color.fromRGBO(0, 116, 227, 1),
      const Color.fromRGBO(230, 74, 25, 1),
      const Color.fromRGBO(216, 27, 96, 1),
      const Color.fromRGBO(103, 58, 184, 1),
      const Color.fromRGBO(2, 137, 123, 1)
    ];
    sampleListModel.darkPaletteColors = <Color>[
      const Color.fromRGBO(68, 138, 255, 1),
      const Color.fromRGBO(255, 110, 64, 1),
      const Color.fromRGBO(238, 79, 132, 1),
      const Color.fromRGBO(180, 137, 255, 1),
      const Color.fromRGBO(29, 233, 182, 1)
    ];
    sampleListModel.paletteBorderColors = <Color>[
      const Color.fromRGBO(0, 116, 227, 1),
      Colors.transparent,
      Colors.transparent,
      Colors.transparent,
      Colors.transparent
    ];
  }
}

// Search bar, rounded corner
class _PersistentHeaderDelegate extends SliverPersistentHeaderDelegate {
  _PersistentHeaderDelegate(SampleModel sampleModel) {
    _sampleListModel = sampleModel;
  }
  SampleModel? _sampleListModel;

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    return SizedBox(
      height: 90,
      child: Container(
          color: _sampleListModel!.paletteColor,
          child: Column(
            children: <Widget>[
              Container(
                padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
                height: 70,
                // child: _sampleListModel!.searchBar,
              ),
              Container(
                  height: 20,
                  decoration: BoxDecoration(
                      color: _sampleListModel!.webBackgroundColor,
                      borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(12.0),
                          topRight: Radius.circular(12.0)),
                      boxShadow: <BoxShadow>[
                        BoxShadow(
                          color: _sampleListModel!.webBackgroundColor,
                          offset: const Offset(0, 2.0),
                          blurRadius: 0.25,
                        )
                      ])),
            ],
          )),
    );
  }

  @override
  double get maxExtent => 90;

  @override
  double get minExtent => 90;

  @override
  bool shouldRebuild(_PersistentHeaderDelegate oldDelegate) {
    return true;
  }
}

/// Positioning/aligning the categories as  cards
/// based on the screen width
class _CategorizedCards extends StatefulWidget {
  @override
  _CategorizedCardsState createState() => _CategorizedCardsState();
}

class _CategorizedCardsState extends State<_CategorizedCards> {
  SampleModel model = SampleModel.instance;
  late double _cardWidth;
  late double _cardHeight;

  @override
  Widget build(BuildContext context) {
    return model.isWeb
        ? Scrollbar(thumbVisibility: model.isWeb, child: _getCategorizedCards())
        : _getCategorizedCards();
  }

  Widget _getCategorizedCards() {
    final double deviceWidth = MediaQuery.of(context).size.width;
    double padding;
    double sidePadding = deviceWidth > 1060
        ? deviceWidth * 0.038
        : deviceWidth >= 768
            ? deviceWidth * 0.041
            : deviceWidth * 0.05;

    Widget? organizedCardWidget;

    if (deviceWidth > 1060) {
      padding = deviceWidth * 0.011;
      _cardWidth = (deviceWidth * 0.9) / 2; // original : 3
      _cardHeight = 700;

      ///setting max cardwidth, spacing between cards in higher resolutions
      if (deviceWidth > 3000) {
        _cardWidth = deviceWidth / 2; // original : 3.5
        _cardHeight = 1500;
        sidePadding = (_cardWidth / 2) * 0.125;
        padding = 30;
      }
      final List<Widget> firstColumnWidgets = <Widget>[];
      final List<Widget> secondColumnWidgets = <Widget>[];
      final List<Widget> thirdColumnWidgets = <Widget>[];
      int firstColumnControlCount = 0;
      int secondColumnControlCount = 0;
      for (int i = 0; i < model.categoryList.length; i++) {
        if (firstColumnControlCount < model.controlList.length / 3) {
          firstColumnWidgets.add(_getCategoryWidget(model.categoryList[i]));
          firstColumnWidgets
              .add(Padding(padding: EdgeInsets.only(top: padding)));
          firstColumnControlCount += model.categoryList[i].controlList!.length;
        } else if (secondColumnControlCount < model.controlList.length / 3 &&
            (secondColumnControlCount +
                    model.categoryList[i].controlList!.length <
                model.controlList.length / 3)) {
          secondColumnWidgets.add(_getCategoryWidget(model.categoryList[i]));
          secondColumnWidgets
              .add(Padding(padding: EdgeInsets.only(top: padding)));
          secondColumnControlCount += model.categoryList[i].controlList!.length;
        } else {
          thirdColumnWidgets.add(_getCategoryWidget(model.categoryList[i]));
          thirdColumnWidgets
              .add(Padding(padding: EdgeInsets.only(top: padding)));
        }
        organizedCardWidget = Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Padding(padding: EdgeInsets.only(left: sidePadding)),
            Column(children: firstColumnWidgets),
            Padding(padding: EdgeInsets.only(left: padding)),
            Column(children: secondColumnWidgets),
            Padding(padding: EdgeInsets.only(left: padding)),
            Column(children: thirdColumnWidgets),
            Padding(
              padding: EdgeInsets.only(left: sidePadding),
            )
          ],
        );
      }
    } else if (deviceWidth >= 768) {
      padding = deviceWidth * 0.018;
      _cardWidth = (deviceWidth * 0.9) / 2;
      _cardHeight = 700;
      final List<Widget> firstColumnWidgets = <Widget>[];
      final List<Widget> secondColumnWidgets = <Widget>[];
      int firstColumnControlCount = 0;
      for (int i = 0; i < model.categoryList.length; i++) {
        if (firstColumnControlCount < model.controlList.length / 2) {
          firstColumnWidgets.add(_getCategoryWidget(model.categoryList[i]));
          firstColumnWidgets
              .add(Padding(padding: EdgeInsets.only(top: padding)));
          firstColumnControlCount += model.categoryList[i].controlList!.length;
        } else {
          secondColumnWidgets.add(_getCategoryWidget(model.categoryList[i]));
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
            Padding(
              padding: EdgeInsets.only(left: sidePadding),
            )
          ],
        );
      }
    } else {
      _cardWidth = deviceWidth * 0.9;
      _cardHeight = 500;
      padding = deviceWidth * 0.035;
      sidePadding = (deviceWidth * 0.1) / 2;
      final List<Widget> verticalOrderedWidgets = <Widget>[];
      for (int i = 0; i < model.categoryList.length; i++) {
        verticalOrderedWidgets.add(_getCategoryWidget(model.categoryList[i]));
        verticalOrderedWidgets
            .add(Padding(padding: EdgeInsets.only(top: padding)));
      }
      organizedCardWidget = Row(
        children: <Widget>[
          Padding(padding: EdgeInsets.only(left: sidePadding)),
          Column(children: verticalOrderedWidgets),
          Padding(
            padding: EdgeInsets.only(left: sidePadding),
          )
        ],
      );
    }
    return SingleChildScrollView(
        child: Container(
            padding: EdgeInsets.only(top: deviceWidth > 1060 ? 15 : 10),
            child: organizedCardWidget));
  }

  /// get the rounded corner layout for given category
  Widget _getCategoryWidget(WidgetCategory category) {
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
            child: Text(
              category.categoryName!.toUpperCase(),
              style: TextStyle(
                  color: model.backgroundColor,
                  fontSize: 16,
                  fontFamily: 'Roboto-Bold'),
            ),
          ),
          Divider(
            color: model.themeData.colorScheme.brightness == Brightness.dark
                ? const Color.fromRGBO(61, 61, 61, 1)
                : const Color.fromRGBO(238, 238, 238, 1),
            thickness: 1,
          ),
          Column(children: _getControlListView(category))
        ]));
  }

  /// get the list view of the controls in the specified category.
  List<Widget> _getControlListView(WidgetCategory category) {
    final List<Widget> items = <Widget>[];
    for (int i = 0; i < category.controlList!.length; i++) {
      final Control control = category.controlList![i] as Control;
      final String? status = control.status;

      items.add(
        Container(
            color: model.cardColor,
            child: Material(
              color: model.cardColor,
              child: InkWell(
                splashFactory: InkRipple.splashFactory,
                hoverColor: Colors.grey.withOpacity(0.2),
                onTap: () {
                  !model.isWebFullView
                      ? onTapControlInMobile(context, model, category, i)
                      : onTapControlInWeb(context, model, category, i);
                  model.searchResults.clear();
                },
                child: ListTile(
                    contentPadding: EdgeInsets.fromLTRB(
                        12, 2, 0, category.controlList!.length > 3 ? 6 : 0),
                    leading: Image.asset(control.image!, fit: BoxFit.cover),
                    title: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Row(children: <Widget>[
                            Text(
                              control.title!,
                              textAlign: TextAlign.left,
                              softWrap: true,
                              textScaleFactor: 1,
                              overflow: TextOverflow.fade,
                              style: TextStyle(
                                  fontSize: 12,
                                  letterSpacing: 0.1,
                                  color: model.textColor,
                                  fontFamily: 'Roboto-Bold'),
                            ),
                            if (!model.isWebFullView && Platform.isIOS)
                              Container()
                            else
                              (control.isBeta ?? false)
                                  ? Padding(
                                      padding: const EdgeInsets.only(left: 8),
                                      child: Container(
                                          alignment: Alignment.center,
                                          padding: model.isWeb &&
                                                  model.isMobileResolution
                                              ? const EdgeInsets.fromLTRB(
                                                  3, 1.5, 3, 5.5)
                                              : const EdgeInsets.fromLTRB(
                                                  3, 3, 3, 2),
                                          decoration: const BoxDecoration(
                                              color: Color.fromRGBO(
                                                  245, 188, 14, 1)),
                                          child: const Text(
                                            'BETA',
                                            style: TextStyle(
                                                fontSize: 10,
                                                fontWeight: FontWeight.w500,
                                                letterSpacing: 0.12,
                                                fontFamily: 'Roboto-Medium',
                                                color: Colors.black),
                                          )))
                                  : Container()
                          ]),
                          if (status != null)
                            Container(
                                decoration: BoxDecoration(
                                    color: status.toLowerCase() == 'new'
                                        ? const Color.fromRGBO(55, 153, 30, 1)
                                        : status.toLowerCase() == 'updated'
                                            ? const Color.fromRGBO(
                                                246, 117, 0, 1)
                                            : Colors.transparent,
                                    borderRadius: const BorderRadius.only(
                                        topLeft: Radius.circular(10),
                                        bottomLeft: Radius.circular(10))),
                                padding: model.isWeb && model.isMobileResolution
                                    ? const EdgeInsets.fromLTRB(6, 1.5, 4, 5.5)
                                    : const EdgeInsets.fromLTRB(6, 2.7, 4, 2.7),
                                child: Text(status,
                                    style: const TextStyle(
                                        fontFamily: 'Roboto-Medium',
                                        color: Colors.white,
                                        fontSize: 10.5)))
                          else
                            Container()
                        ]),
                    subtitle: Padding(
                      padding: const EdgeInsets.fromLTRB(0.0, 7.0, 12.0, 0.0),
                      child: Text(
                        control.description!,
                        textAlign: TextAlign.left,
                        softWrap: true,
                        textScaleFactor: 1,
                        overflow: TextOverflow.fade,
                        style: const TextStyle(
                          fontWeight: FontWeight.normal,
                          fontSize: 12,
                          color: Color.fromRGBO(128, 128, 128, 1),
                        ),
                      ),
                    )),
              ),
            )),
      );
    }
    return items;
  }
}
