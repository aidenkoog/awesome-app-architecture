import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/components/home/home_left_panel.dart';
import 'package:flutter_web_navigation/presentation/components/home/home_right_panel.dart';
import 'package:flutter_web_navigation/utils/drawer_util.dart';

import '../components/custom_outlined_button.dart';

const String featureName = "CUSTOMER";

class Feature1 extends StatefulWidget {
  final String routeName;
  final GlobalKey<ScaffoldState> parentScaffoldKey;

  const Feature1(
      {Key? key, required this.routeName, required this.parentScaffoldKey})
      : super(key: key);

  @override
  State<Feature1> createState() => _Feature1State();
}

class _Feature1State extends State<Feature1> {
  Widget? render;

  @override
  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      // button container.
      Container(
          alignment: Alignment.topLeft,
          margin: const EdgeInsets.fromLTRB(100, 40, 0, 0),
          child: CustomOutlinedButton(
              buttonName: "+ ADD CUSTOMER",
              color: Colors.red,
              callback: _onAddCustomer)),

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

  // show ui for adding customer information.
  _onAddCustomer() => openEndDrawerUi(widget.parentScaffoldKey);
}
