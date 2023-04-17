import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core.dart';

class SubNavigationRoutes {
  String title;
  IconData icon;
  RouteData route;
  SubNavigationRoutes(
      {required this.title, required this.icon, required this.route});
}

// route pages list.
List<SubNavigationRoutes> routeList = [
  // customer
  SubNavigationRoutes(
      title: RouteData.customer.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.customer),

  // inventory
  SubNavigationRoutes(
      title: RouteData.inventory.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.inventory),

  // agency
  SubNavigationRoutes(
      title: RouteData.agency.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.agency),

  // accounting
  SubNavigationRoutes(
      title: RouteData.accounting.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.accounting),

  // events
  SubNavigationRoutes(
      title: RouteData.events.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.events),

  // qna
  SubNavigationRoutes(
      title: RouteData.qna.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.qna),
];
