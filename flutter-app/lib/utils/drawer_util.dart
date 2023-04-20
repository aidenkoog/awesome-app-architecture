import 'package:flutter/material.dart';

void openEndDrawerUi(GlobalKey<ScaffoldState> scaffoldKey) =>
    scaffoldKey.currentState!.openEndDrawer();

void openDrawerUi(GlobalKey<ScaffoldState> scaffoldKey) =>
    scaffoldKey.currentState!.openDrawer();
