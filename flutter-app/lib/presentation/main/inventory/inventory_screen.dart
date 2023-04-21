import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import '../../../assets/strings/values.dart';
import '../../../utils/drawer_util.dart';
import '../../components/button/custom_outlined_button.dart';
import '../../container/components/main/main_content_card.dart';

class InventoryScreen extends StatelessWidget {
  final ScrollController controller;
  final String routeName;
  final GlobalKey<ScaffoldState> parentScaffoldKey;

  const InventoryScreen({
    Key? key,
    required this.routeName,
    required this.parentScaffoldKey,
    required this.controller,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        transform: Matrix4.translationValues(0, -1, 0),
        child: Scrollbar(
            controller: controller,
            thumbVisibility: true,
            child: CustomScrollView(
                controller: controller,
                physics: const ClampingScrollPhysics(),
                slivers: <Widget>[
                  SliverList(
                      delegate: SliverChildListDelegate(<Widget>[
                    Column(children: <Widget>[
                      Container(
                          alignment: Alignment.topLeft,
                          margin: const EdgeInsets.only(
                              top: mainContentBtnLayoutTopMargin,
                              left: mainContentBtnLayoutLeftMargin),
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
                                callback: _onDownloadSample)
                          ])),
                      MainContentCard(routeName: routeName)
                    ])
                  ]))
                ])));
  }

  _onImport() => openEndDrawerUi(parentScaffoldKey);
  _onExport() => openEndDrawerUi(parentScaffoldKey);
  _onBatchRegistration() => openEndDrawerUi(parentScaffoldKey);
  _onDownloadSample() => openEndDrawerUi(parentScaffoldKey);
}
