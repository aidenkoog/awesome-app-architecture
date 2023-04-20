import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/theme/theme_model.dart';

class MobileNavDrawerMenuItem extends StatelessWidget {
  final ThemeModel model;
  final String menuText;
  final VoidCallback callback;
  const MobileNavDrawerMenuItem(
      {Key? key,
      required this.model,
      required this.menuText,
      required this.callback})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
        color: Colors.transparent,
        child: InkWell(
            splashColor: Colors.grey.withOpacity(0.4),
            onTap: () {
              Feedback.forLongPress(context);
              callback();
            },
            child: Column(children: <Widget>[
              const Padding(padding: EdgeInsets.only(top: 10)),
              Row(children: <Widget>[
                Padding(
                    padding: const EdgeInsets.fromLTRB(15, 0, 0, 0),
                    child: Icon(Icons.settings, color: model.backgroundColor)),
                Container(
                    padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                    child: Text(menuText,
                        style: TextStyle(
                            color: model.drawerTextIconColor,
                            fontSize: 16,
                            letterSpacing: 0.4,
                            fontFamily: 'Roboto-Regular',
                            fontWeight: FontWeight.normal))),
                const Spacer()
              ]),
              const Padding(padding: EdgeInsets.only(top: 10))
            ])));
  }
}
