import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core/global_config/route_constants.dart';
import 'package:flutter_web_navigation/utils/drawer_util.dart';
import '../../components/button/custom_outlined_button.dart';
import '../base/home_content.dart';

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
      HomeContent(featureName: routeAgencyForDisplay)
    ]);
  }

  // handler for agency 1 button.
  _onClickAgency() => openEndDrawerUi(parentScaffoldKey);

  // handler for agency 2 button.
  _onClickAgency2() => openEndDrawerUi(parentScaffoldKey);

  // handler for agency 3 button.
  _onClickAgency3() => openEndDrawerUi(parentScaffoldKey);
}
