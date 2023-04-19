import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core/global_config/route_constants.dart';
import '../base/home_content.dart';

class QnaScreen extends StatelessWidget {
  final String routeName;

  const QnaScreen({
    Key? key,
    required this.routeName,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      // button container.
      Container(
          alignment: Alignment.topLeft,
          margin: const EdgeInsets.fromLTRB(100, 40, 0, 0),
          child: Row(
            children: const [],
          )),

      // main left and right panels.
      HomeContent(featureName: routeQnaForDisplay)
    ]);
  }
}
