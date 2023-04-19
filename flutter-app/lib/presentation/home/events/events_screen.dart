import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core/global_config/route_constants.dart';
import 'package:flutter_web_navigation/utils/drawer_util.dart';
import '../../components/button/custom_outlined_button.dart';
import '../base/home_content.dart';

class EventScreen extends StatelessWidget {
  final String routeName;
  final GlobalKey<ScaffoldState> parentScaffoldKey;

  const EventScreen({
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
                  buttonName: 'DOWNLOAD EXCEL',
                  color: Colors.green,
                  callback: _onDownloadExcel),
            ],
          )),

      // main left and right panels.
      HomeContent(featureName: routeEventsForDisplay)
    ]);
  }

  _onDownloadExcel() => openEndDrawerUi(parentScaffoldKey);
}
