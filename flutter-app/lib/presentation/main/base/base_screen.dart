import 'package:flutter/material.dart';

import '../../container/components/scaffold/mobile/mobile_appbar_title_items.dart';
import '../../theme/theme_model.dart';

class BaseScreen extends StatefulWidget {
  final ThemeModel themeModel = ThemeModel.instance;
  final ScrollController controller;
  final String routeName;
  final GlobalKey<ScaffoldState> parentScaffoldKey;

  BaseScreen(
      {Key? key,
      required this.controller,
      required this.routeName,
      required this.parentScaffoldKey})
      : super(key: key);

  @override
  State<StatefulWidget> createState() => BaseScreenState<BaseScreen>();
}

class BaseScreenState<T extends StatefulWidget> extends State<T> {
  late double cardWidth;
  late double padding;
  late double sidePadding;

  getScrollController() {}
  getThemeModel() {}
  getRouteName() {}

  getMainLayout() => Container();

  getLeftTopContent() => Container(
      alignment: Alignment.topLeft, padding: const EdgeInsets.all(21));

  getRightTopContent() => Container(
      alignment: Alignment.topLeft, padding: const EdgeInsets.all(14));

  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }

  Widget getScrollableWidget(ThemeModel model) {
    return model.isWeb
        ? Scrollbar(
            controller: getScrollController(),
            thumbVisibility: true,
            child: _getCustomScrollWidget(model))
        : _getCustomScrollWidget(model);
  }

  Widget _getCustomScrollWidget(ThemeModel model) {
    return Container(
        color: model.paletteColor,
        child: GlowingOverscrollIndicator(
            color: model.paletteColor,
            axisDirection: AxisDirection.down,
            child: CustomScrollView(
                controller: getScrollController(),
                physics: const ClampingScrollPhysics(),
                slivers: loadSilvers())));
  }

  List<Widget> loadSilvers() {
    ThemeModel themeModel = getThemeModel();
    return <Widget>[
      SliverToBoxAdapter(
          child: getMobileAppBarTitleItems(context, (menuIndex) => {})),
      SliverPersistentHeader(
          pinned: true, delegate: PersistentHeaderDelegate(themeModel)),
      SliverList(
          delegate: SliverChildListDelegate(<Widget>[
        Container(color: themeModel.webBackgroundColor, child: getMainLayout())
      ]))
    ];
  }
}

class PersistentHeaderDelegate extends SliverPersistentHeaderDelegate {
  PersistentHeaderDelegate(ThemeModel sampleModel) {
    _themeModel = sampleModel;
  }
  ThemeModel? _themeModel;

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    return SizedBox(
        height: 90,
        child: Container(
            color: _themeModel!.paletteColor,
            child: Column(children: <Widget>[
              Container(
                  padding: const EdgeInsets.fromLTRB(20, 0, 20, 0), height: 70),
              Container(height: 20, decoration: getBoxDecoration())
            ])));
  }

  getBoxDecoration() {
    BoxDecoration(
        color: _themeModel!.webBackgroundColor,
        borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(12.0), topRight: Radius.circular(12.0)),
        boxShadow: <BoxShadow>[
          BoxShadow(
              color: _themeModel!.webBackgroundColor,
              offset: const Offset(0, 2.0),
              blurRadius: 0.25)
        ]);
  }

  @override
  double get maxExtent => 90;

  @override
  double get minExtent => 90;

  @override
  bool shouldRebuild(PersistentHeaderDelegate oldDelegate) => true;
}
