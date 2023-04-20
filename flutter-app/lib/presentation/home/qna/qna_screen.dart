import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
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
      Container(
          alignment: Alignment.topLeft,
          margin: const EdgeInsets.fromLTRB(100, 40, 0, 0),
          child: Row(children: const [])),
      const HomeContent(featureName: routeKeyQna)
    ]);
  }
}
