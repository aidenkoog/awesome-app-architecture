import 'package:flutter/material.dart';

import '../components/custom_outlined_button.dart';
import '../components/home/home_left_panel.dart';
import '../components/home/home_right_panel.dart';

const featureName = 'AGENCY';

class Feature3 extends StatelessWidget {
  final String routeName;

  const Feature3({
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
            children: [
              const CustomOutlinedButton(
                  buttonName: 'AGENCY 1',
                  color: Colors.red,
                  callback: _onClickAgency),
              const SizedBox(
                width: 8,
              ),
              const CustomOutlinedButton(
                  buttonName: 'AGENCY 2',
                  color: Colors.red,
                  callback: _onClickAgency2),
              const SizedBox(
                width: 8,
              ),
              const CustomOutlinedButton(
                  buttonName: 'AGENCY 3',
                  color: Colors.red,
                  callback: _onClickAgency3),
            ],
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

_onClickAgency() {}
_onClickAgency2() {}
_onClickAgency3() {}
