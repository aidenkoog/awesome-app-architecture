import 'package:flutter/material.dart';

import 'administrator_main_title.dart';
import 'customer_page.dart';

class AdministratorMain extends StatelessWidget {
  const AdministratorMain({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      const AdministratorMainTitle(),
      const Divider(height: 1.0, color: Colors.lightBlue),
      CustomerPage()
    ]);
  }
}
