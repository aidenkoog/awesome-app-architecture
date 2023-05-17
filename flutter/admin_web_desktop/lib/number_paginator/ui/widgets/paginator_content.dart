import 'package:flutter/material.dart';
import '../../model/display_mode.dart';
import 'inherited_number_paginator.dart';
import 'paginator_content/dropdown_content.dart';
import 'paginator_content/number_content.dart';

class PaginatorContent extends StatelessWidget {
  final int currentPage;

  const PaginatorContent({
    Key? key,
    required this.currentPage,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var mode = InheritedNumberPaginator.of(context).config.mode;

    switch (mode) {
      case ContentDisplayMode.numbers:
        return NumberContent(currentPage: currentPage);
      case ContentDisplayMode.dropdown:
        return DropDownContent(currentPage: currentPage);
      default:
        return Container();
    }
  }
}
