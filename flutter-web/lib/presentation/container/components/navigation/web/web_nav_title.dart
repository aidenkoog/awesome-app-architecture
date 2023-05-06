// ignore_for_file: file_names

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import '../../../../theme/theme_model.dart';

class NavigationTitle extends StatelessWidget {
  final ThemeModel model;
  final String title;
  final String subDescription;
  final VoidCallback callback;
  const NavigationTitle(
      {Key? key,
      required this.model,
      required this.title,
      required this.subDescription,
      required this.callback})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        transform: Matrix4.translationValues(0, 4, 0),
        child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              MouseRegion(
                  cursor: SystemMouseCursors.click,
                  child: GestureDetector(
                      onTap: () => callback(),
                      child: Padding(
                          padding: const EdgeInsets.fromLTRB(24, 10, 0, 0),
                          child: Text(title,
                              style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 28,
                                  letterSpacing: 0.53,
                                  fontFamily: 'Roboto-Bold'))))),
              Padding(
                  padding: const EdgeInsets.fromLTRB(24, 0, 0, 0),
                  child: Text(subDescription,
                      style: const TextStyle(
                          color: Colors.white,
                          fontSize: 14,
                          fontFamily: 'Roboto-Regular',
                          letterSpacing: 0.26,
                          fontWeight: FontWeight.normal))),
              const Padding(padding: EdgeInsets.only(top: 15)),
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
                            blurRadius: 0.25)
                      ]))
            ]));
  }
}
