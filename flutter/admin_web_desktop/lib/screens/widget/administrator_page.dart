import 'package:flutter/material.dart';

import '../responsive/mobile_page.dart';
import '../responsive/responsive_layout.dart';
import 'desktop/administrator/administrator_main.dart';

class AdministratorPage extends StatefulWidget {
  const AdministratorPage({super.key});

  @override
  State<AdministratorPage> createState() => _AdministratorMainState();
}

class _AdministratorMainState extends State<AdministratorPage> {
  @override
  Widget build(BuildContext context) => const Scaffold(
      body: ResponsiveLayout(
          mobilePage: MobilePage(), desktopPage: AdministratorMain()));
}
