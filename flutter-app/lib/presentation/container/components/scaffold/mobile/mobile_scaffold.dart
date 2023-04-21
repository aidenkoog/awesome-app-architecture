import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/values.dart';
import 'package:flutter_web_navigation/presentation/container/components/navigation/mobile/mobile_nav_icon.dart';
import 'package:flutter_web_navigation/presentation/container/components/navigation/mobile/mobile_nav_info.dart';
import 'package:flutter_web_navigation/presentation/container/components/navigation/mobile/mobile_nav_opacity_title.dart';
import 'package:flutter_web_navigation/presentation/container/components/navigation/mobile/mobile_nav_settings_icon.dart';

import '../../../../../assets/strings/strings.dart';
import '../../../../theme/theme_model.dart';
import '../../../../../utils/auth_util.dart';
import '../../../../../utils/navigation_util.dart';
import '../../../../components/context_menu/custom_popup_menu_button.dart';
import '../../../../components/loading/custom_loading.dart';
import '../../drawer/palette/theme_setting_builder.dart';
import '../../main/main_content_card.dart';
import '../../navigation/mobile/mobile_nav_drawer.dart';
import '../../navigation/mobile/mobile_nav_title.dart';
import '../../popup_menu/popup_menu_items.dart';

class HomeMobileScaffold extends StatefulWidget {
  final String routeName;
  final GlobalKey<ScaffoldState> scaffoldKey;
  final ThemeModel model;
  final ScrollController controller;

  const HomeMobileScaffold(
      {Key? key,
      required this.scaffoldKey,
      required this.model,
      required this.controller,
      required this.routeName})
      : super(key: key);

  @override
  State<StatefulWidget> createState() => _HomeMobileScaffoldState();
}

class _HomeMobileScaffoldState extends State<HomeMobileScaffold> {
  Widget? render;
  bool isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        drawer: (!widget.model.isWebFullView && Platform.isIOS)
            ? null
            : getMobileNavMenuDrawer(widget.model),
        key: widget.scaffoldKey,
        backgroundColor: widget.model.webBackgroundColor,
        endDrawerEnableOpenDragGesture: false,
        endDrawer: widget.model.isWebFullView
            ? showWebThemeSettings(widget.model)
            : null,
        appBar: PreferredSize(
            preferredSize: const Size.fromHeight(46.0),
            child: AppBar(
                leading: (!widget.model.isWebFullView && Platform.isIOS)
                    ? Container()
                    : null,
                elevation: 0.0,
                backgroundColor: widget.model.paletteColor,
                title: MobileNavOpacityTitle(
                    controller: widget.controller,
                    opacity: 0,
                    child: const Text(homeTitle,
                        style: TextStyle(
                            fontSize: 18, fontFamily: 'HeeboMedium'))),
                actions: <Widget>[
                  MobileNavSettingsIcon(scaffoldKey: widget.scaffoldKey)
                ])),
        body: Container(
            transform: Matrix4.translationValues(0, -1, 0),
            child: _getScrollableWidget(widget.model)));
  }

  Widget _getScrollableWidget(ThemeModel model) {
    return model.isWeb
        ? Scrollbar(
            controller: widget.controller,
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
                controller: widget.controller,
                physics: const ClampingScrollPhysics(),
                slivers: <Widget>[
                  SliverToBoxAdapter(
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                        const MobileNavigationTitle(
                            subDescription: homeSubDescription,
                            title: homeTitle),
                        Row(children: [
                          const MobileNavigationInfo(
                              infoText: homeLoginInfoText),
                          CustomPopupMenuButton(
                              popupMenuItemList: getPopupMenuItems(context),
                              childWidget: const MobileNavigationIcon(
                                  icon: Icon(Icons.supervised_user_circle,
                                      color: Colors.white)),
                              onSelected: (value) {
                                switch (value) {
                                  case popupMenuItemLogoutIndex:
                                    setState(() => isLoading = true);
                                    signOut((signOutCompleted) {
                                      setState(
                                          () => isLoading = !signOutCompleted);
                                      signOutCompleted
                                          ? navigateByLogout()
                                          : {};
                                    });
                                    break;
                                }
                              })
                        ])
                      ])),
                  SliverPersistentHeader(
                      pinned: true, delegate: _PersistentHeaderDelegate(model)),
                  SliverList(
                      delegate: SliverChildListDelegate(<Widget>[
                    Container(
                        color: model.webBackgroundColor,
                        child: isLoading
                            ? CustomLoading(
                                loadingBarColor: widget.model.paletteColor,
                                textColor: widget.model.paletteColor)
                            : MainContentCard(
                                routeName: widget.routeName,
                              ))
                  ]))
                ])));
  }
}

class _PersistentHeaderDelegate extends SliverPersistentHeaderDelegate {
  _PersistentHeaderDelegate(ThemeModel sampleModel) {
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
              Container(
                  height: 20,
                  decoration: BoxDecoration(
                      color: _themeModel!.webBackgroundColor,
                      borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(12.0),
                          topRight: Radius.circular(12.0)),
                      boxShadow: <BoxShadow>[
                        BoxShadow(
                            color: _themeModel!.webBackgroundColor,
                            offset: const Offset(0, 2.0),
                            blurRadius: 0.25)
                      ]))
            ])));
  }

  @override
  double get maxExtent => 90;

  @override
  double get minExtent => 90;

  @override
  bool shouldRebuild(_PersistentHeaderDelegate oldDelegate) => true;
}
