import 'package:flutter/material.dart';

// open the drawer ui shown on the right side of the screen.
openEndDrawerUi(GlobalKey<ScaffoldState> scaffoldKey) {
  scaffoldKey.currentState!.openEndDrawer();
}

// open the drawer ui shown on the left side of the screen.
openDrawerUi(GlobalKey<ScaffoldState> scaffoldKey) {
  scaffoldKey.currentState!.openDrawer();
}
