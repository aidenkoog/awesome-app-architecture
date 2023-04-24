import 'package:flutter/material.dart';

import '../../../../../assets/strings/strings.dart';
import '../../navigation/mobile/mobile_nav_info.dart';
import '../../navigation/mobile/mobile_nav_title.dart';

typedef OnSelectAccountIconCallback = void Function(int);

getMobileAppBarTitleItems(BuildContext context,
    OnSelectAccountIconCallback selectAccountIconCallback) {
  return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const MobileNavigationTitle(
        subDescription: homeSubDescription, title: homeTitle),
    Row(children: const [MobileNavigationInfo(infoText: homeLoginInfoText)])
  ]);
}
