import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/home/feature_1_screen.dart';
import 'package:flutter_web_navigation/presentation/home/feature_4_screen.dart';
import 'package:flutter_web_navigation/presentation/home/feature_2_screen.dart';
import 'package:flutter_web_navigation/presentation/home/feature_3_screen.dart';
import 'package:flutter_web_navigation/presentation/home/feature_5_screen.dart';
import 'package:flutter_web_navigation/presentation/home/feature_6_screen.dart';
import 'package:flutter_web_navigation/presentation/exception/unknown_screen.dart';

enum RouteData {
  unkownRoute,
  notFound,
  intro,
  feature1,
  feature2,
  feature3,
  feature4,
  feature5,
  feature6
}

class RouteHandeler {
  static final RouteHandeler _instance = RouteHandeler._();
  factory RouteHandeler() => _instance;
  RouteHandeler._();

  // get route widget corresponding to route name.
  Widget getRouteWidget(
      String? routeName, GlobalKey<ScaffoldState> scaffoldKey) {
    RouteData routeData;

    if (routeName != null) {
      final uri = Uri.parse(routeName);
      if (uri.pathSegments.isNotEmpty) {
        final pathName = uri.pathSegments.elementAt(0).toString();
        routeData = RouteData.values.firstWhere(
            (element) => element.name == pathName,
            orElse: () => RouteData.notFound);

        if (routeData != RouteData.notFound) {
          switch (routeData) {
            case RouteData.feature1:
              return Feature1(
                  routeName: routeName, parentScaffoldKey: scaffoldKey);

            case RouteData.feature2:
              return Feature2(
                  routeName: routeName, parentScaffoldKey: scaffoldKey);

            case RouteData.feature3:
              return Feature3(
                  routeName: routeName, parentScaffoldKey: scaffoldKey);

            case RouteData.feature4:
              return Feature4(
                routeName: routeName,
                parentScaffoldKey: scaffoldKey,
              );

            case RouteData.feature5:
              return Feature5(
                routeName: routeName,
                parentScaffoldKey: scaffoldKey,
              );

            case RouteData.feature6:
              return Feature6(
                routeName: routeName,
              );

            default:
              return Feature1(
                  routeName: routeName, parentScaffoldKey: scaffoldKey);
          }
        } else {
          return const UnknownRoute();
        }
      } else {
        return Feature1(routeName: routeName, parentScaffoldKey: scaffoldKey);
      }
    } else {
      return const UnknownRoute();
    }
  }
}
