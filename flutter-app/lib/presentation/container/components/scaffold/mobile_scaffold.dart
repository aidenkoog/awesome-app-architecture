// ignore_for_file: overridden_fields

import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/container/components/navigation/mobile/mobile_navigation_info.dart';

import '../../../../temp/animate_opacity_widget.dart';
import '../../../../temp/helper.dart';
import '../../../../temp/model.dart';
import '../navigation/mobile/mobile_navigation_title.dart';
import 'base_scaffold.dart';

class HomeMobileScaffold extends HomeBaseScaffold {
  @override
  final GlobalKey<ScaffoldState> scaffoldKey;
  @override
  final SampleModel model;
  @override
  final ScrollController controller;
  @override
  final String currentSelectedItemButton;

  const HomeMobileScaffold(this.scaffoldKey, this.model, this.controller,
      this.currentSelectedItemButton, {Key? key})
      : super(
            key: key,
            scaffoldKey: scaffoldKey,
            model: model,
            controller: controller,
            currentSelectedItemButton: currentSelectedItemButton);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        drawer: (!model.isWebFullView && Platform.isIOS)
            ? null
            : getLeftSideDrawer(model),
        key: scaffoldKey,
        backgroundColor: model.webBackgroundColor,
        endDrawerEnableOpenDragGesture: false,
        endDrawer: model.isWebFullView ? showWebThemeSettings(model) : null,
        appBar: PreferredSize(
            preferredSize: const Size.fromHeight(46.0),
            child: AppBar(
              leading:
                  (!model.isWebFullView && Platform.isIOS) ? Container() : null,
              elevation: 0.0,
              backgroundColor: model.paletteColor,
              title: AnimateOpacityWidget(
                  controller: controller,
                  opacity: 0,
                  child: const Text('AnimateOpacityWidget',
                      style:
                          TextStyle(fontSize: 18, fontFamily: 'HeeboMedium'))),
              actions: <Widget>[
                SizedBox(
                  height: 10,
                  width: 40,
                  child: IconButton(
                    icon: const Icon(Icons.settings, color: Colors.white),
                    onPressed: () {
                      scaffoldKey.currentState!.openEndDrawer();
                    },
                  ),
                ),
              ],
            )),

        // body content.
        body: Container(
            transform: Matrix4.translationValues(0, -1, 0),
            child: _getScrollableWidget(model)));
  }

  // Get scrollable widget to getting stickable view with scrollbar depends on platform
  Widget _getScrollableWidget(SampleModel model) {
    return model.isWeb
        ? Scrollbar(
            controller: controller,
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
              controller: controller,
              physics: const ClampingScrollPhysics(),
              slivers: <Widget>[
                SliverToBoxAdapter(
                    child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    // title & sub-description.
                    MobileNavigationTitle(
                      subDescription: 'Portal . Debugging version',
                      title: 'Admin System by AidenKooG, Mobile',
                    ),

                    // logout information & user account icon.
                    MobileNavigationInfo(
                      infoText: 'Logout: 100H 59M 59S',
                      icon: Icon(
                        Icons.supervised_user_circle,
                        color: Colors.white,
                      ),
                    )
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
                        child: const CategorizedCards()),
                  ]),
                )
              ],
            )));
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
