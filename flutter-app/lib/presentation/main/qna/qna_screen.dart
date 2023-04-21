import 'package:flutter/material.dart';
import '../../../assets/strings/values.dart';
import '../../container/components/main/main_content_card.dart';

class QnaScreen extends StatelessWidget {
  final ScrollController controller;
  final String routeName;
  final GlobalKey<ScaffoldState> parentScaffoldKey;

  const QnaScreen({
    Key? key,
    required this.routeName,
    required this.parentScaffoldKey,
    required this.controller,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        transform: Matrix4.translationValues(0, -1, 0),
        child: Scrollbar(
            controller: controller,
            thumbVisibility: true,
            child: CustomScrollView(
                controller: controller,
                physics: const ClampingScrollPhysics(),
                slivers: <Widget>[
                  SliverList(
                      delegate: SliverChildListDelegate(<Widget>[
                    Column(children: <Widget>[
                      Container(
                          alignment: Alignment.topLeft,
                          margin: const EdgeInsets.only(
                              top: mainContentBtnLayoutTopMargin,
                              left: mainContentBtnLayoutLeftMargin),
                          child: Row(children: const [])),
                      MainContentCard(routeName: routeName)
                    ])
                  ]))
                ])));
  }
}
