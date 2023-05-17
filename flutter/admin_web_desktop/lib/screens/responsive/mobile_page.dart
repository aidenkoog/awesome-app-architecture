import 'package:flutter/material.dart';

class MobilePage extends StatelessWidget {
  const MobilePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: AppBar(title: const Text('Mobile'))),
        backgroundColor: Colors.deepPurple[200]);
  }
}
