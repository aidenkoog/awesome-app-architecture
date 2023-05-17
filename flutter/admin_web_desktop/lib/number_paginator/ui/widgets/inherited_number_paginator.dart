import 'package:flutter/material.dart';
import '../../model/config.dart';

class InheritedNumberPaginator extends InheritedWidget {
  final int numberPages;
  final int initialPage;
  final Function(int)? onPageChange;
  final NumberPaginatorUIConfig config;

  const InheritedNumberPaginator({
    Key? key,
    required this.numberPages,
    this.initialPage = 0,
    this.onPageChange,
    required this.config,
    required Widget child,
  }) : super(key: key, child: child);

  static InheritedNumberPaginator of(BuildContext context) {
    final InheritedNumberPaginator? result =
        context.dependOnInheritedWidgetOfExactType<InheritedNumberPaginator>();
    assert(result != null, "No NumberPaginatorConfig found in context");
    return result!;
  }

  @override
  bool updateShouldNotify(InheritedNumberPaginator oldWidget) => true;
}
