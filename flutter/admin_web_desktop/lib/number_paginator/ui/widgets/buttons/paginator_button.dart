import 'package:flutter/material.dart';
import '../inherited_number_paginator.dart';

class PaginatorButton extends StatelessWidget {
  final VoidCallback? onPressed;
  final Widget child;
  final bool selected;

  const PaginatorButton(
      {Key? key,
      required this.onPressed,
      required this.child,
      this.selected = false})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
        aspectRatio: 1,
        child: Padding(
            padding: const EdgeInsets.all(0.0),
            child: TextButton(
                onPressed: onPressed,
                style: TextButton.styleFrom(
                    shape: InheritedNumberPaginator.of(context)
                            .config
                            .buttonShape ??
                        const CircleBorder(),
                    backgroundColor: _backgroundColor(context, selected),
                    foregroundColor: _foregroundColor(context, selected)),
                child: child)));
  }

  Color? _backgroundColor(BuildContext context, bool selected) => selected
      ? (InheritedNumberPaginator.of(context)
              .config
              .buttonSelectedBackgroundColor ??
          Theme.of(context).colorScheme.secondary)
      : InheritedNumberPaginator.of(context)
          .config
          .buttonUnselectedBackgroundColor;

  Color? _foregroundColor(BuildContext context, bool selected) => selected
      ? (InheritedNumberPaginator.of(context)
              .config
              .buttonSelectedForegroundColor ??
          Colors.white)
      : InheritedNumberPaginator.of(context)
          .config
          .buttonUnselectedForegroundColor;
}
