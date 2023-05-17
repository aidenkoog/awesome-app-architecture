import 'package:flutter/material.dart';
import 'paginator_button.dart';

class PaginatorIconButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback? onPressed;

  const PaginatorIconButton({Key? key, required this.icon, this.onPressed})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return PaginatorButton(
        onPressed: onPressed, child: FittedBox(child: Icon(icon)));
  }
}
