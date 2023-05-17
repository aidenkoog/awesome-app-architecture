import 'package:flutter/material.dart';
import '../model/config.dart';
import '../model/display_mode.dart';
import 'number_paginator_controller.dart';
import 'widgets/buttons/paginator_icon_button.dart';
import 'widgets/inherited_number_paginator.dart';
import 'widgets/paginator_content.dart';

typedef NumberPaginatorContentBuilder = Widget Function(int index);

class NumberPaginator extends StatefulWidget {
  final int numberPages;
  final int initialPage;
  final Function(int)? onPageChange;
  final NumberPaginatorUIConfig config;
  final NumberPaginatorContentBuilder? contentBuilder;
  final NumberPaginatorController? controller;

  const NumberPaginator({
    Key? key,
    required this.numberPages,
    this.initialPage = 0,
    this.onPageChange,
    this.config = const NumberPaginatorUIConfig(),
    this.contentBuilder,
    this.controller,
  })  : assert(initialPage >= 0),
        assert(initialPage <= numberPages - 1),
        super(key: key);

  @override
  NumberPaginatorState createState() => NumberPaginatorState();
}

class NumberPaginatorState extends State<NumberPaginator> {
  late NumberPaginatorController _controller;

  @override
  void initState() {
    super.initState();

    _controller = widget.controller ?? NumberPaginatorController();
    _controller.currentPage = widget.initialPage;
    _controller.addListener(() {
      widget.onPageChange?.call(_controller.currentPage);
    });
  }

  @override
  Widget build(BuildContext context) {
    return InheritedNumberPaginator(
        numberPages: widget.numberPages,
        initialPage: widget.initialPage,
        onPageChange: _controller.navigateToPage,
        config: widget.config,
        child: SizedBox(
            height: widget.config.height,
            child: Row(
                mainAxisAlignment: widget.config.mainAxisAlignment,
                children: [
                  PaginatorIconButton(
                      onPressed:
                          _controller.currentPage > 0 ? _controller.prev : null,
                      icon: Icons.chevron_left),
                  ..._buildCenterContent(),
                  PaginatorIconButton(
                      onPressed:
                          _controller.currentPage < widget.numberPages - 1
                              ? _controller.next
                              : null,
                      icon: Icons.chevron_right)
                ])));
  }

  List<Widget> _buildCenterContent() {
    return [
      if (widget.contentBuilder != null)
        Container(
            padding: widget.config.contentPadding,
            child: widget.contentBuilder!(_controller.currentPage))
      else if (widget.config.mode != ContentDisplayMode.hidden)
        Expanded(
            child: Container(
                padding: widget.config.contentPadding,
                child: PaginatorContent(currentPage: _controller.currentPage)))
    ];
  }
}
