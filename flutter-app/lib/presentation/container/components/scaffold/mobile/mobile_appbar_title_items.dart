import 'package:flutter/material.dart';

import '../../../../../assets/strings/strings.dart';
import '../../../../components/context_menu/custom_popup_menu_button.dart';
import '../../navigation/mobile/mobile_nav_icon.dart';
import '../../navigation/mobile/mobile_nav_info.dart';
import '../../navigation/mobile/mobile_nav_title.dart';
import '../../popup_menu/popup_menu_items.dart';

typedef OnSelectAccountIconCallback = void Function(int);

getMobileAppBarTitleItems(BuildContext context,
    OnSelectAccountIconCallback selectAccountIconCallback) {
  return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const MobileNavigationTitle(
        subDescription: homeSubDescription, title: homeTitle),
    Row(children: [
      const MobileNavigationInfo(infoText: homeLoginInfoText),
      CustomPopupMenuButton(
          popupMenuItemList: getPopupMenuItems(context),
          childWidget: const MobileNavigationIcon(
              icon: Icon(Icons.supervised_user_circle, color: Colors.white)),
          onSelected: (menuIndex) => selectAccountIconCallback(menuIndex))
    ])
  ]);
}
