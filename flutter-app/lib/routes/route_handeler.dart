import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/screens/main/feature_1_screen.dart';
import 'package:flutter_web_navigation/screens/main/feature_4_screen.dart';
import 'package:flutter_web_navigation/screens/main/feature_2_screen.dart';
import 'package:flutter_web_navigation/screens/main/feature_3_screen.dart';
import 'package:flutter_web_navigation/screens/main/feature_5_screen.dart';
import 'package:flutter_web_navigation/screens/main/feature_6_screen.dart';
import 'package:flutter_web_navigation/screens/exception/unknown_screen.dart';

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

  Widget getRouteWidget(String? routeName) {
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
                routeName: routeName,
              );

            case RouteData.feature2:
              return Feature2(
                routeName: routeName,
              );

            case RouteData.feature3:
              return Feature3(
                routeName: routeName,
              );

            case RouteData.feature4:
              return Feature4(
                routeName: routeName,
              );

            case RouteData.feature5:
              return Feature5(
                routeName: routeName,
              );

            case RouteData.feature6:
              return Feature6(
                routeName: routeName,
              );

            default:
              return Feature1(
                routeName: routeName,
              );
          }
        } else {
          return const UnknownRoute();
        }
      } else {
        return Feature1(
          routeName: routeName,
        );
      }
    } else {
      return const UnknownRoute();
    }
  }
}
