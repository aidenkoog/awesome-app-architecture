import 'package:flutter/cupertino.dart';

import 'web_drawer_tabitem.dart';

class WebDrawerTabContainer extends StatelessWidget {
  final List<String> tabItemList;
  const WebDrawerTabContainer({Key? key, required this.tabItemList})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
        flex: 2,
        child: Column(children: [
          Container(
              padding: const EdgeInsets.fromLTRB(10, 0, 10, 10),
              child: Expanded(
                  flex: 1,
                  child: Column(children: [
                    const SizedBox(height: 30),
                    WebDrawerTabItem(tabName: tabItemList[0], isSelected: true),
                    const SizedBox(height: 40),
                    WebDrawerTabItem(
                        tabName: tabItemList[1], isSelected: false),
                    const SizedBox(height: 40),
                    WebDrawerTabItem(
                        tabName: tabItemList[2], isSelected: false),
                    const SizedBox(height: 40),
                    WebDrawerTabItem(
                        tabName: tabItemList[3], isSelected: false),
                  ])))
        ]));
  }
}
