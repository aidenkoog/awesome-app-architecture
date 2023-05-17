import 'package:flutter/material.dart';

import 'screens/widget/administrator_page.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) =>
      const MaterialApp(home: AdministratorPage());
}
