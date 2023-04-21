import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import 'package:flutter_web_navigation/utils/drawer_util.dart';
import '../../components/button/custom_outlined_button.dart';
import '../../container/components/main/main_content_card.dart';

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
      Container(
          alignment: Alignment.topLeft,
          margin: const EdgeInsets.only(top: 13, left: 80),
          child: Row(children: [
            CustomOutlinedButton(
                buttonName: agencyBtn1Text,
                color: Colors.red,
                callback: _onClickAgency),
            const SizedBox(width: 8),
            CustomOutlinedButton(
                buttonName: agencyBtn2Text,
                color: Colors.red,
                callback: _onClickAgency2),
            const SizedBox(width: 8),
            CustomOutlinedButton(
                buttonName: agencyBtn3Text,
                color: Colors.red,
                callback: _onClickAgency3)
          ])),
      MainContentCard(
        routeName: routeName,
      )
    ]);
  }

  _onClickAgency() => openEndDrawerUi(parentScaffoldKey);
  _onClickAgency2() => openEndDrawerUi(parentScaffoldKey);
  _onClickAgency3() => openEndDrawerUi(parentScaffoldKey);
}
