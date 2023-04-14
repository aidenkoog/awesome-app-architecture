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
  SubNavigationRoutes(
      title: RouteData.feature1.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.feature1),
  SubNavigationRoutes(
      title: RouteData.feature2.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.feature2),
  SubNavigationRoutes(
      title: RouteData.feature3.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.feature3),
  SubNavigationRoutes(
      title: RouteData.feature4.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.feature4),
  SubNavigationRoutes(
      title: RouteData.feature5.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.feature5),
  SubNavigationRoutes(
      title: RouteData.feature6.name.toUpperCase(),
      icon: Icons.settings,
      route: RouteData.feature6),
];
