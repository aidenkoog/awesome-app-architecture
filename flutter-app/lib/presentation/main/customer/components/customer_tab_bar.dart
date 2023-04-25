import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/main/customer/components/customer_no_data_screen.dart';

class CustomerTabBar extends StatelessWidget {
  final Color tabColor;
  const CustomerTabBar({Key? key, required this.tabColor}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 3,
        child: SizedBox(
            height: 250.0,
            child: Column(children: <Widget>[
              TabBar(
                  dividerColor: tabColor,
                  indicatorColor: tabColor,
                  indicator: UnderlineTabIndicator(
                      borderSide: BorderSide(color: tabColor, width: 2.0)),
                  tabs: <Widget>[
                    Tab(
                        child: Text('TAB 1',
                            style: TextStyle(
                                color: tabColor, fontWeight: FontWeight.w800))),
                    Tab(
                        child: Text('TAB 2',
                            style: TextStyle(
                                color: tabColor, fontWeight: FontWeight.w800))),
                    Tab(
                        child: Text('TAB 3',
                            style: TextStyle(
                                color: tabColor, fontWeight: FontWeight.w800)))
                  ]),
              Expanded(
                  child: TabBarView(children: <Widget>[
                CustomerNoDataScreen(tabColor: tabColor),
                const CustomerNoDataScreen(tabColor: Colors.black54),
                const CustomerNoDataScreen(tabColor: Colors.blueGrey),
              ]))
            ])));
  }
}
