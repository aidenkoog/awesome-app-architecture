import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/utils/drawer_util.dart';

import '../../components/custom/custom_outlined_button.dart';
import '../../components/home/home_content.dart';

const featureName = 'AGENCY';

class AgencyScreen extends StatelessWidget {
  final String routeName;
  final GlobalKey<ScaffoldState> parentScaffoldKey;

  const AgencyScreen({
    Key? key,
    required this.routeName,
    required this.parentScaffoldKey,
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
              CustomOutlinedButton(
                  buttonName: 'AGENCY 1',
                  color: Colors.red,
                  callback: _onClickAgency),
              const SizedBox(
                width: 8,
              ),
              CustomOutlinedButton(
                  buttonName: 'AGENCY 2',
                  color: Colors.red,
                  callback: _onClickAgency2),
              const SizedBox(
                width: 8,
              ),
              CustomOutlinedButton(
                  buttonName: 'AGENCY 3',
                  color: Colors.red,
                  callback: _onClickAgency3),
            ],
          )),

      // main left and right panels.
      const HomeContent(featureName: featureName)
    ]);
  }

  // handler for agency 1 button.
  _onClickAgency() => openEndDrawerUi(parentScaffoldKey);

  // handler for agency 2 button.
  _onClickAgency2() => openEndDrawerUi(parentScaffoldKey);

  // handler for agency 3 button.
  _onClickAgency3() => openEndDrawerUi(parentScaffoldKey);
}
