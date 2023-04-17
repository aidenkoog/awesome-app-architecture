import 'package:flutter/cupertino.dart';

import 'home_left_panel.dart';
import 'home_right_panel.dart';

class HomeContent extends StatelessWidget {
  final String featureName;

  const HomeContent({Key? key, required this.featureName}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
        flex: 1,
        child: Row(
          children: [
            HomeLeftPanel(
                sectionName: featureName,
                description: featureName,
                subDecription: featureName),
            const SizedBox(
              width: 25,
            ),
            HomeRightPanel(
                sectionName: '$featureName SETTING',
                description: '$featureName SETTING',
                subDecription: '$featureName SETTING')
          ],
        ));
  }
}
