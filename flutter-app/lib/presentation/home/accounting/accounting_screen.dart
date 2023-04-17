import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core/route_config/route_constants.dart';
import 'package:flutter_web_navigation/presentation/components/home/content/home_content.dart';
import 'package:flutter_web_navigation/utils/drawer_util.dart';

import '../../components/custom/custom_outlined_button.dart';

class AccountingScreen extends StatelessWidget {
  final String routeName;
  final GlobalKey<ScaffoldState> parentScaffoldKey;

  const AccountingScreen({
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
                  buttonName: 'DOWNLOAD EXCEL',
                  color: Colors.green,
                  callback: _onDownloadExcel),
            ],
          )),

      // main left and right panels.
      HomeContent(featureName: routeAccountingForDisplay)
    ]);
  }

  // handler for download excel button.
  _onDownloadExcel() => openEndDrawerUi(parentScaffoldKey);
}
