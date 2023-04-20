import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import '../../../utils/drawer_util.dart';
import '../../components/button/custom_outlined_button.dart';
import '../base/home_content.dart';

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
      Container(
          alignment: Alignment.topLeft,
          margin: const EdgeInsets.fromLTRB(100, 40, 0, 0),
          child: Row(children: [
            const SizedBox(width: 8),
            CustomOutlinedButton(
                buttonName: inventoryImportBtnText,
                color: Colors.red,
                callback: _onImport),
            const SizedBox(width: 8),
            CustomOutlinedButton(
                buttonName: inventoryExportBtnText,
                color: Colors.red,
                callback: _onExport),
            const SizedBox(width: 8),
            CustomOutlinedButton(
                buttonName: inventoryBatchRegBtnText,
                color: Colors.red,
                callback: _onBatchRegistration),
            const SizedBox(width: 8),
            CustomOutlinedButton(
                buttonName: inventoryDownloadSampleBtnText,
                color: Colors.green,
                callback: _onDownloadSample),
          ])),
      const HomeContent(featureName: routeKeyInventory)
    ]);
  }

  _onImport() => openEndDrawerUi(parentScaffoldKey);
  _onExport() => openEndDrawerUi(parentScaffoldKey);
  _onBatchRegistration() => openEndDrawerUi(parentScaffoldKey);
  _onDownloadSample() => openEndDrawerUi(parentScaffoldKey);
}
