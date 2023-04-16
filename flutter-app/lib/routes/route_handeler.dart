import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/home/customer/customer_screen.dart';
import 'package:flutter_web_navigation/presentation/home/accounting/accounting_screen.dart';
import 'package:flutter_web_navigation/presentation/home/inventory/inventory_screen.dart';
import 'package:flutter_web_navigation/presentation/home/agency/agency_screen.dart';
import 'package:flutter_web_navigation/presentation/home/events/events_screen.dart';
import 'package:flutter_web_navigation/presentation/home/qna/qna_screen.dart';
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
              return CustomerScreen(
                  routeName: routeName, parentScaffoldKey: scaffoldKey);

            case RouteData.feature2:
              return InventoryScreen(
                  routeName: routeName, parentScaffoldKey: scaffoldKey);

            case RouteData.feature3:
              return AgencyScreen(
                  routeName: routeName, parentScaffoldKey: scaffoldKey);

            case RouteData.feature4:
              return AccountingScreen(
                routeName: routeName,
                parentScaffoldKey: scaffoldKey,
              );

            case RouteData.feature5:
              return EventScreen(
                routeName: routeName,
                parentScaffoldKey: scaffoldKey,
              );

            case RouteData.feature6:
              return QnaScreen(
                routeName: routeName,
              );

            default:
              return CustomerScreen(
                  routeName: routeName, parentScaffoldKey: scaffoldKey);
          }
        } else {
          return const UnknownRoute();
        }
      } else {
        return CustomerScreen(
            routeName: routeName, parentScaffoldKey: scaffoldKey);
      }
    } else {
      return const UnknownRoute();
    }
  }
}
