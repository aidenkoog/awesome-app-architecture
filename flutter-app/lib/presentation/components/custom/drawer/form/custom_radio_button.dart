import 'package:flutter/material.dart';

class CustomRadioButton extends StatefulWidget {
  final String label;
  final String firstName;
  final String secondName;
  const CustomRadioButton(
      {Key? key,
      required this.firstName,
      required this.secondName,
      required this.label})
      : super(key: key);

  @override
  State<CustomRadioButton> createState() => _CustomRadioButtonState();
}

class _CustomRadioButtonState extends State<CustomRadioButton> {
  String selectedName = 'A';

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.all(10),
        alignment: Alignment.centerLeft,
        child: Row(
          children: [
            Expanded(
                flex: 1,
                child: Container(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      widget.label,
                      style: const TextStyle(
                          color: Colors.black87, fontWeight: FontWeight.w600),
                    ))),
            Expanded(
                flex: 1,
                child: Container(
                  alignment: Alignment.centerLeft,
                  child: RadioListTile(
                    title: Text(widget.firstName),
                    value: widget.firstName,
                    groupValue: selectedName,
                    onChanged: (value) {
                      setState(() {
                        selectedName = value as String;
                      });
                    },
                  ),
                )),
            Expanded(
                flex: 5,
                child: Container(
                  alignment: Alignment.centerLeft,
                  child: RadioListTile(
                    title: Text(widget.secondName),
                    value: widget.secondName,
                    groupValue: selectedName,
                    onChanged: (value) {
                      setState(() {
                        selectedName = value as String;
                      });
                    },
                  ),
                ))
          ],
        ));
  }
}
