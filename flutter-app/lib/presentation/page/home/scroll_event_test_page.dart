// ignore_for_file: avoid_print

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

class ScrollEventTestPage extends StatefulWidget {
  const ScrollEventTestPage({super.key, required this.title});

  final String title;

  @override
  State<ScrollEventTestPage> createState() => _ScrollEventTestPageState();
}

class _ScrollEventTestPageState extends State<ScrollEventTestPage> {
  late ScrollController _scrollController;

  void _handleScrollDirectionEvents() {
    try {
      if (_scrollController.position.userScrollDirection ==
          ScrollDirection.reverse) {
        print("debug: reverse!!!");
      } else if (_scrollController.position.userScrollDirection ==
          ScrollDirection.forward) {
        print("debug: forward!!!");
      }
    } catch (_) {}
  }

  @override
  void initState() {
    _scrollController = ScrollController()
      ..addListener(_handleScrollDirectionEvents);
    super.initState();
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ListView(controller: _scrollController, children: <Widget>[
      Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const <Widget>[
            Square(),
            Square2(),
            Square(),
            Square2(),
            Square(),
            Square2(),
            Square(),
            Square2(),
            Square(),
            Square2(),
            Square()
          ])
    ]);
  }
}

class Square extends StatelessWidget {
  const Square({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
        width: 200,
        height: 100,
        decoration: BoxDecoration(color: Colors.yellow, border: Border.all()));
  }
}

class Square2 extends StatelessWidget {
  const Square2({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
        width: 200,
        height: 100,
        decoration: BoxDecoration(color: Colors.blue, border: Border.all()));
  }
}
