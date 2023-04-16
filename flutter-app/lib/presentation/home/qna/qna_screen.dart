import 'package:flutter/material.dart';

import '../../components/home/home_content.dart';

const featureName = 'Q&A';

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
      const HomeContent(featureName: featureName)
    ]);
  }
}
