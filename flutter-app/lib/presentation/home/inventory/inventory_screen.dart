import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core/route_config/route_constants.dart';
import '../../../utils/drawer_util.dart';
import '../../components/button/custom_outlined_button.dart';
import '../home_content.dart';

class InventoryScreen extends StatelessWidget {
  final String routeName;
  final GlobalKey<ScaffoldState> parentScaffoldKey;

  const InventoryScreen({
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
              spaceBox,
              CustomOutlinedButton(
                  buttonName: 'IMPORT 2',
                  color: Colors.red,
                  callback: _onImport),
              spaceBox,
              CustomOutlinedButton(
                  buttonName: 'EXPORT', color: Colors.red, callback: _onExport),
              spaceBox,
              CustomOutlinedButton(
                  buttonName: 'BATCH REGISTRATION',
                  color: Colors.red,
                  callback: _onBatchRegistration),
              spaceBox,
              CustomOutlinedButton(
                  buttonName: 'DOWNLOAD SAMPLE',
                  color: Colors.green,
                  callback: _onDownloadSample),
            ],
          )),

      // main left and right panels.
      HomeContent(featureName: routeInventoryForDisplay)
    ]);
  }

  // handler for the button which imports content.
  _onImport() => openEndDrawerUi(parentScaffoldKey);

  // handler for the button which exports content.
  _onExport() => openEndDrawerUi(parentScaffoldKey);

  // handler for batch registration button.
  _onBatchRegistration() => openEndDrawerUi(parentScaffoldKey);

  // handler for download sample button.
  _onDownloadSample() => openEndDrawerUi(parentScaffoldKey);
}

// widget for putting space between buttons.
const spaceBox = SizedBox(
  width: 8,
);
