import 'dart:async';

import '../routes/route_delegate.dart';
import '../routes/route_handler.dart';

void navigateWithDelay(String routeName) =>
    Timer(const Duration(seconds: 1), () async {
      AppRouterDelegate().setPathName(routeName);
    });

void navigate(String routeName) => AppRouterDelegate().setPathName(routeName);

void navigateByLogout() =>
    AppRouterDelegate().setPathName(RouteData.intro.name, loggedIn: false);
