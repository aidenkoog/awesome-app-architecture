import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/components/home/home_left_panel.dart';
import 'package:flutter_web_navigation/presentation/components/home/home_right_panel.dart';

import '../components/custom_outlined_button.dart';

const String featureName = "CUSTOMER";

class Feature1 extends StatelessWidget {
  final String routeName;

  const Feature1({
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
          child: const CustomOutlinedButton(
            buttonName: "+ ADD CUSTOMER",
            color: Colors.red,
          )),

      // main left and right panels.
      Expanded(
          flex: 1,
          child: Row(
            children: const [
              MainLeftPanel(
                  sectionName: featureName,
                  description: featureName,
                  subDecription: featureName),
              SizedBox(
                width: 25,
              ),
              MainRightPanel(
                  sectionName: '$featureName SETTING',
                  description: '$featureName SETTING',
                  subDecription: '$featureName SETTING')
            ],
          ))
    ]);
  }
}
