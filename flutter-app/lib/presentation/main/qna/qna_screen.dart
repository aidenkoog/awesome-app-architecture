import 'package:flutter/material.dart';
import '../../container/components/main/main_content_card.dart';

class QnaScreen extends StatelessWidget {
  final String routeName;
  final GlobalKey<ScaffoldState> parentScaffoldKey;

  const QnaScreen({
    Key? key,
    required this.routeName,
    required this.parentScaffoldKey,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      Container(
          alignment: Alignment.topLeft,
          margin: const EdgeInsets.only(top: 13, left: 85),
          child: Row(children: const [])),
      MainContentCard(routeName: routeName)
    ]);
  }
}
