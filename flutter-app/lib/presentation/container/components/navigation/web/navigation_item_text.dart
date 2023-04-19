import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/temp/model.dart';

class NavigationItemText extends StatelessWidget {
  final SampleModel model;
  final String text;
  const NavigationItemText({
    Key? key,
    required this.model,
    required this.text,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final bool isMaxxSize = MediaQuery.of(context).size.width >= 1500;

    return model.isMobileResolution
        ? Container()
        : Container(
            alignment: Alignment.center,
            padding: EdgeInsets.only(top: 10, left: isMaxxSize ? 25 : 12),
            child: SizedBox(
                height: 32,
                child: StatefulBuilder(
                    builder: (BuildContext context, StateSetter setState) {
                  return Padding(
                    padding: const EdgeInsets.fromLTRB(0, 7, 8, 7),
                    child: Row(children: <Widget>[
                      Text(text,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                              color: Colors.white,
                              fontSize: 12,
                              fontFamily: 'Roboto-Medium')),
                    ]),
                  );
                })));
  }
}
