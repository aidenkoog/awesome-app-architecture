import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/main/customer/customer_screen.dart';
import 'package:flutter_web_navigation/presentation/main/accounting/accounting_screen.dart';
import 'package:flutter_web_navigation/presentation/main/inventory/inventory_screen.dart';
import 'package:flutter_web_navigation/presentation/main/agency/agency_screen.dart';
import 'package:flutter_web_navigation/presentation/main/events/events_screen.dart';
import 'package:flutter_web_navigation/presentation/main/qna/qna_screen.dart';
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

  Widget getRouteWidget(String? routeName, GlobalKey<ScaffoldState> scaffoldKey,
      ScrollController controller) {
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
                routeName: routeName,
                parentScaffoldKey: scaffoldKey,
                controller: controller,
              );

            case RouteData.inventory:
              return InventoryScreen(
                  routeName: routeName,
                  parentScaffoldKey: scaffoldKey,
                  controller: controller);

            case RouteData.agency:
              return AgencyScreen(
                  routeName: routeName,
                  parentScaffoldKey: scaffoldKey,
                  controller: controller);

            case RouteData.accounting:
              return AccountingScreen(
                  routeName: routeName,
                  parentScaffoldKey: scaffoldKey,
                  controller: controller);

            case RouteData.events:
              return EventScreen(
                  routeName: routeName,
                  parentScaffoldKey: scaffoldKey,
                  controller: controller);

            case RouteData.qna:
              return QnaScreen(
                  routeName: routeName,
                  parentScaffoldKey: scaffoldKey,
                  controller: controller);

            default:
              return CustomerScreen(
                  routeName: routeName,
                  parentScaffoldKey: scaffoldKey,
                  controller: controller);
          }
        } else {
          return const UnknownRoute();
        }
      } else {
        return CustomerScreen(
            routeName: routeName,
            parentScaffoldKey: scaffoldKey,
            controller: controller);
      }
    } else {
      return const UnknownRoute();
    }
  }
}
