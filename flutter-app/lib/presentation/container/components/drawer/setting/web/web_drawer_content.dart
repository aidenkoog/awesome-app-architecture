import 'package:flutter/material.dart';
import '../../../../../../assets/strings/strings.dart';
import 'form/web_drawer_content_form.dart';
import 'tab/web_drawer_tab_container.dart';
import 'title/web_drawer_title.dart';

class WebDrawerContent extends StatefulWidget {
  const WebDrawerContent({Key? key}) : super(key: key);

  @override
  State<WebDrawerContent> createState() => _WebDrawerContentState();
}

class _WebDrawerContentState extends State<WebDrawerContent> {
  @override
  Widget build(BuildContext context) {
    return Column(children: [
      const WebDrawerTitle(drawerTitle: customerDrawerTitle),
      const SizedBox(
          width: 1000, child: Divider(color: Colors.grey, thickness: 1.5)),
      Expanded(
          flex: 1,
          child: Container(
              color: Colors.blue.shade50,
              padding: const EdgeInsets.all(0),
              child: Expanded(
                  flex: 1,
                  child: Row(children: const [
                    WebDrawerTabContainer(tabItemList: customerDrawerTabList),
                    WebDrawerContentForm(formTitle: customerDrawerFormTitle)
                  ]))))
    ]);
  }
}
