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
  customer,
  inventory,
  agency,
  accounting,
  events,
  qna
}

class RouteHandler {
  static final RouteHandler _instance = RouteHandler._();
  factory RouteHandler() => _instance;
  RouteHandler._();

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
            case RouteData.customer:
              return CustomerScreen(
                  routeName: routeName, parentScaffoldKey: scaffoldKey);

            case RouteData.inventory:
              return InventoryScreen(
                  routeName: routeName, parentScaffoldKey: scaffoldKey);

            case RouteData.agency:
              return AgencyScreen(
                  routeName: routeName, parentScaffoldKey: scaffoldKey);

            case RouteData.accounting:
              return AccountingScreen(
                routeName: routeName,
                parentScaffoldKey: scaffoldKey,
              );

            case RouteData.events:
              return EventScreen(
                routeName: routeName,
                parentScaffoldKey: scaffoldKey,
              );

            case RouteData.qna:
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
