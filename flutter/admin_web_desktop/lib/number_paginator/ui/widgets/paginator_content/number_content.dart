import 'dart:math';

import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import '../buttons/paginator_button.dart';
import '../inherited_number_paginator.dart';

class NumberContent extends StatelessWidget {
  final int currentPage;

  const NumberContent({
    Key? key,
    required this.currentPage,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
      var buttonWidth = constraints.maxHeight;
      var availableSpots = (constraints.maxWidth / buttonWidth).floor();

      return Row(mainAxisAlignment: MainAxisAlignment.spaceAround, children: [
        _buildPageButton(context, 0),
        if (_frontDotsShouldShow(context, availableSpots)) _buildDots(context),
        if (InheritedNumberPaginator.of(context).numberPages > 1)
          ..._generateButtonList(context, availableSpots),
        if (_backDotsShouldShow(context, availableSpots)) _buildDots(context),
        if (InheritedNumberPaginator.of(context).numberPages > 1)
          _buildPageButton(
              context, InheritedNumberPaginator.of(context).numberPages - 1)
      ]);
    });
  }

  List<Widget> _generateButtonList(BuildContext context, int availableSpots) {
    var shownPages = availableSpots -
        2 -
        (_backDotsShouldShow(context, availableSpots) ? 1 : 0) -
        (_frontDotsShouldShow(context, availableSpots) ? 1 : 0);

    var numberPages = InheritedNumberPaginator.of(context).numberPages;

    int minValue, maxValue;
    minValue = max(1, currentPage - shownPages ~/ 2);
    maxValue = min(minValue + shownPages, numberPages - 1);
    if (maxValue - minValue < shownPages) {
      minValue = (maxValue - shownPages).clamp(1, numberPages - 1);
    }

    return List.generate(maxValue - minValue,
        (index) => _buildPageButton(context, minValue + index));
  }

  Widget _buildPageButton(BuildContext context, int index) => PaginatorButton(
      onPressed: () =>
          InheritedNumberPaginator.of(context).onPageChange?.call(index),
      selected: _selected(index),
      child: AutoSizeText((index + 1).toString(),
          maxLines: 1,
          minFontSize: 5,
          style: const TextStyle(fontWeight: FontWeight.bold)));

  Widget _buildDots(BuildContext context) => AspectRatio(
      aspectRatio: 1,
      child: Container(
          margin: const EdgeInsets.all(8.0),
          alignment: Alignment.bottomCenter,
          decoration: ShapeDecoration(
              shape: InheritedNumberPaginator.of(context).config.buttonShape ??
                  const CircleBorder(),
              color: InheritedNumberPaginator.of(context)
                  .config
                  .buttonUnselectedBackgroundColor),
          child: AutoSizeText("...",
              style: TextStyle(
                  color: InheritedNumberPaginator.of(context)
                          .config
                          .buttonUnselectedForegroundColor ??
                      Theme.of(context).colorScheme.secondary,
                  fontSize: 16,
                  fontWeight: FontWeight.bold))));

  bool _backDotsShouldShow(BuildContext context, int availableSpots) =>
      availableSpots < InheritedNumberPaginator.of(context).numberPages &&
      currentPage <
          InheritedNumberPaginator.of(context).numberPages -
              availableSpots ~/ 2;

  bool _frontDotsShouldShow(BuildContext context, int availableSpots) =>
      availableSpots < InheritedNumberPaginator.of(context).numberPages &&
      currentPage > availableSpots ~/ 2 - 1;

  bool _selected(index) => index == currentPage;
}
