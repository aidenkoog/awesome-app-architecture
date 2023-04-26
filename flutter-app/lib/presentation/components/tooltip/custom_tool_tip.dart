import 'package:flutter/material.dart';

class CustomToolTip extends StatelessWidget {
  final GlobalKey<TooltipState> toolTipKey;
  final Widget childWidget;
  final Color color;
  final String toolTipMessage;
  const CustomToolTip(
      {Key? key,
      required this.childWidget,
      required this.color,
      required this.toolTipMessage,
      required this.toolTipKey})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Tooltip(
        key: toolTipKey,
        decoration: BoxDecoration(
            border: Border.all(color: color, width: 2.0),
            boxShadow: const [BoxShadow(color: Colors.white)],
            borderRadius: const BorderRadius.all(Radius.circular(5))),
        triggerMode: TooltipTriggerMode.tap,
        waitDuration: const Duration(minutes: 1),
        textStyle: TextStyle(color: color, fontSize: 12),
        message: toolTipMessage,
        child: childWidget);
  }
}
