// ignore_for_file: avoid_print
import 'dart:async';

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

  bool isForward = false;
  bool isReverse = false;

  var alignment = Alignment.centerLeft;
  Timer? timer;

  void _handleScrollDirectionEvents() {
    try {
      if (_scrollController.position.userScrollDirection ==
          ScrollDirection.reverse) {
        if (timer != null) {
          timer!.cancel();
        }
        timer = Timer(const Duration(milliseconds: 300), () async {
          setState(() {
            alignment = alignment == Alignment.centerLeft
                ? Alignment.centerRight
                : Alignment.centerLeft;
            isForward = false;
            isReverse = true;
          });
        });
      } else if (_scrollController.position.userScrollDirection ==
          ScrollDirection.forward) {
        if (timer != null) {
          timer!.cancel();
        }
        timer = Timer(const Duration(milliseconds: 300), () async {
          setState(() {
            alignment = alignment == Alignment.centerRight
                ? Alignment.centerLeft
                : Alignment.centerRight;
            isForward = true;
            isReverse = false;
          });
        });
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
  void didChangeDependencies() {
    super.didChangeDependencies();
    setState(() {
      isForward = false;
      isReverse = false;
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ListView(controller: _scrollController, children: [
      const Expanded(
          child: FlutterLogo(
        size: 200,
      )),
      const Expanded(
          child: FlutterLogo(
        size: 200,
      )),
      Expanded(
          child: AnimatedAlign(
              alignment: alignment,
              duration: const Duration(milliseconds: 800),
              child: const FlutterLogo(
                size: 200,
              ))),
      const Expanded(
          child: FlutterLogo(
        size: 200,
      )),
      const Expanded(
          child: FlutterLogo(
        size: 200,
      )),
    ]);
  }
}
