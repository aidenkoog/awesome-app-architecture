import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/components/custom_outlined_button.dart';

import '../components/home/home_left_panel.dart';
import '../components/home/home_right_panel.dart';

const featureName = 'INVENTORY';

class Feature2 extends StatelessWidget {
  final String routeName;
  const Feature2({
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
            // ignore: prefer_const_literals_to_create_immutables
            children: buttonWidgetList,
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

// widget for putting space between buttons.
const spaceBox = SizedBox(
  width: 8,
);

// button list.
const buttonWidgetList = [
  spaceBox,
  CustomOutlinedButton(buttonName: 'IMPORT 2', color: Colors.red),
  spaceBox,
  CustomOutlinedButton(buttonName: 'EXPORT', color: Colors.red),
  spaceBox,
  CustomOutlinedButton(buttonName: 'BATCH REGISTRATION', color: Colors.red),
  spaceBox,
  CustomOutlinedButton(buttonName: 'DOWNLOAD SAMPLE', color: Colors.green),
];
