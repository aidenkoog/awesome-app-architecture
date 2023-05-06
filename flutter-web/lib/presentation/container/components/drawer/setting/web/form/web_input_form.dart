import 'package:flutter/material.dart';

class WebInputForm extends StatefulWidget {
  final String label;
  final String placeHolder;
  const WebInputForm({Key? key, required this.label, required this.placeHolder})
      : super(key: key);

  @override
  State<WebInputForm> createState() => _WebInputFormState();
}

class _WebInputFormState extends State<WebInputForm> {
  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.fromLTRB(10, 10, 70, 10),
        alignment: Alignment.centerLeft,
        child: Row(children: [
          Expanded(
              flex: 1,
              child: Container(
                  alignment: Alignment.centerLeft,
                  child: Text(widget.label,
                      style: const TextStyle(
                          color: Colors.black87,
                          fontWeight: FontWeight.w600)))),
          Expanded(
              flex: 5,
              child: Container(
                  alignment: Alignment.centerLeft,
                  child: TextField(
                      decoration: InputDecoration(
                          border: const OutlineInputBorder(),
                          labelText: widget.placeHolder))))
        ]));
  }
}
