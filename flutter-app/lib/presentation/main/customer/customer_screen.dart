import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import 'package:flutter_web_navigation/utils/drawer_util.dart';
import '../../components/button/custom_outlined_button.dart';
import '../../container/components/main/main_content_card.dart';

class CustomerScreen extends StatefulWidget {
  final String routeName;
  final GlobalKey<ScaffoldState> parentScaffoldKey;

  const CustomerScreen(
      {Key? key, required this.routeName, required this.parentScaffoldKey})
      : super(key: key);

  @override
  State<CustomerScreen> createState() => _CustomScreenState();
}

class _CustomScreenState extends State<CustomerScreen> {
  Widget? render;

  @override
  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      Container(
          alignment: Alignment.topLeft,
          margin: const EdgeInsets.only(top: 13, left: 85),
          child: CustomOutlinedButton(
              buttonName: customerDrawerShowBtnText,
              color: Colors.red,
              callback: _onAddCustomer)),
      MainContentCard(routeName: widget.routeName)
    ]);
  }

  _onAddCustomer() => openEndDrawerUi(widget.parentScaffoldKey);
}
