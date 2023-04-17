import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/components/custom/drawer/form/custom_drawer_content_form.dart';
import 'package:flutter_web_navigation/presentation/components/custom/drawer/tab/custom_drawer_tab_container.dart';
import 'package:flutter_web_navigation/presentation/components/custom/drawer/title/custom_drawer_title.dart';

class CustomDrawerContent extends StatefulWidget {
  const CustomDrawerContent({Key? key}) : super(key: key);

  @override
  State<CustomDrawerContent> createState() => _CustomDrawerContentState();
}

class _CustomDrawerContentState extends State<CustomDrawerContent> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // drawer top title.
        const CustomDrawerTitle(drawerTitle: 'ADD CUSTOMER'),

        // drawer ui top divider.
        const SizedBox(
            width: 1000, child: Divider(color: Colors.grey, thickness: 1.5)),

        // drawer content ui.
        Expanded(
            flex: 1,
            child: Container(
                color: Colors.blue.shade50,
                padding: const EdgeInsets.all(0),
                child: Expanded(
                  flex: 1,
                  child: Row(children: const [
                    // drawer tabs positioned on left side.
                    CustomDrawerTabContainer(tabItemList: [
                      '1. Default',
                      '2. Person',
                      '3. Company',
                      '4. Confirm'
                    ]),

                    // drawer input form located on right side.
                    CustomDrawerContentForm(formTitle: 'Default Information')
                  ]),
                ))),
      ],
    );
  }
}
