import 'package:flutter/material.dart';
import 'display_mode.dart';

class NumberPaginatorUIConfig {
  final double height;

  final OutlinedBorder? buttonShape;

  final Color? buttonSelectedForegroundColor;

  final Color? buttonUnselectedForegroundColor;

  final Color? buttonSelectedBackgroundColor;

  final Color? buttonUnselectedBackgroundColor;

  final ContentDisplayMode mode;

  final MainAxisAlignment mainAxisAlignment;

  final EdgeInsets? contentPadding;

  const NumberPaginatorUIConfig(
      {this.height = 48.0,
      this.buttonShape,
      this.buttonSelectedForegroundColor,
      this.buttonUnselectedForegroundColor,
      this.buttonSelectedBackgroundColor,
      this.buttonUnselectedBackgroundColor,
      this.mode = ContentDisplayMode.numbers,
      this.mainAxisAlignment = MainAxisAlignment.start,
      this.contentPadding});
}
