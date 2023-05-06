import 'package:flutter/material.dart';

void openEndDrawerUi(GlobalKey<ScaffoldState> scaffoldKey) =>
    scaffoldKey.currentState!.openEndDrawer();

void openDrawerUi(GlobalKey<ScaffoldState> scaffoldKey) =>
    scaffoldKey.currentState!.openDrawer();

void closeDrawerUi(GlobalKey<ScaffoldState> scaffoldKey) =>
    scaffoldKey.currentState!.closeDrawer();

void closeEndDrawerUi(GlobalKey<ScaffoldState> scaffoldKey) =>
    scaffoldKey.currentState!.closeEndDrawer();
