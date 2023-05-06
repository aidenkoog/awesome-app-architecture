import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core.dart';

class SubNavigationRoutes {
  String title;
  IconData icon;
  RouteData route;
  SubNavigationRoutes(
      {required this.title, required this.icon, required this.route});
}

List<SubNavigationRoutes> routeList = [
  SubNavigationRoutes(
      title: RouteData.customer.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.customer),
  SubNavigationRoutes(
      title: RouteData.inventory.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.inventory),
  SubNavigationRoutes(
      title: RouteData.agency.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.agency),
  SubNavigationRoutes(
      title: RouteData.accounting.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.accounting),
  SubNavigationRoutes(
      title: RouteData.events.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.events),
  SubNavigationRoutes(
      title: RouteData.qna.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.qna),
];
