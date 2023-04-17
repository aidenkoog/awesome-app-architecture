import 'package:flutter/material.dart';

class CustomInputForm extends StatefulWidget {
  final String label;
  final String placeHolder;
  const CustomInputForm(
      {Key? key, required this.label, required this.placeHolder})
      : super(key: key);

  @override
  State<CustomInputForm> createState() => _CustomInputFormState();
}

class _CustomInputFormState extends State<CustomInputForm> {
  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.fromLTRB(10, 10, 70, 10),
        alignment: Alignment.centerLeft,
        child: Row(
          children: [
            // label.
            Expanded(
                flex: 1,
                child: Container(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      widget.label,
                      style: const TextStyle(
                          color: Colors.black87, fontWeight: FontWeight.w600),
                    ))),

            // text input box.
            Expanded(
                flex: 5,
                child: Container(
                    alignment: Alignment.centerLeft,
                    child: TextField(
                        decoration: InputDecoration(
                      border: const OutlineInputBorder(),
                      labelText: widget.placeHolder,
                    ))))
          ],
        ));
  }
}
