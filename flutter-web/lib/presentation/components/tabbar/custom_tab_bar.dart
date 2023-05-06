import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/components/tabbar/custom_no_data_screen.dart';

class CustomTabBar extends StatelessWidget {
  final Color tabColor;
  final int tabLength;
  const CustomTabBar(
      {Key? key, required this.tabColor, required this.tabLength})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: tabLength,
        child: SizedBox(
            height: 250.0,
            child: Column(children: <Widget>[
              TabBar(
                  dividerColor: tabColor,
                  indicatorColor: tabColor,
                  indicator: UnderlineTabIndicator(
                      borderSide: BorderSide(color: tabColor, width: 2.0)),
                  tabs: _getTabWidgets()),
              Expanded(
                  child: TabBarView(children: <Widget>[
                CustomNoDataScreen(tabColor: tabColor),
                const CustomNoDataScreen(tabColor: Colors.black54),
                const CustomNoDataScreen(tabColor: Colors.blueGrey),
              ]))
            ])));
  }

  _getTabWidgets() {
    switch (tabLength) {
      case 3:
        return <Widget>[
          _getTabItem('TAB 1'),
          _getTabItem('TAB 2'),
          _getTabItem('TAB 3')
        ];
      case 2:
        return <Widget>[_getTabItem('TAB 1'), _getTabItem('TAB 2')];
      default:
        return <Widget>[_getTabItem('TAB 1')];
    }
  }

  _getTabItem(tabTitle) => Tab(
      child: Text('TAB 1',
          style: TextStyle(color: tabColor, fontWeight: FontWeight.w800)));
}
