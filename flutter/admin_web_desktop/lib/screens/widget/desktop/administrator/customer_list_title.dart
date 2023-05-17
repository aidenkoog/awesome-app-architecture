import 'package:flutter/material.dart';

import '../../common/contrained_text_box.dart';

class CustomerListTitle extends StatelessWidget {
  const CustomerListTitle({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        height: 40.0,
        decoration: BoxDecoration(
            color: Colors.grey[100],
            borderRadius: BorderRadius.circular(2.0),
            boxShadow: [
              BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: 5,
                  spreadRadius: 1)
            ]),
        child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text(''),
              ConstrainedTextBox(data: 'Type', minWidth: 40.0, fontSize: 14.0),
              ConstrainedTextBox(data: 'Name', minWidth: 50.0, fontSize: 14.0),
              ConstrainedTextBox(
                  data: 'Device', minWidth: 20.0, fontSize: 14.0),
              ConstrainedTextBox(data: 'Date1', minWidth: 80.0, fontSize: 14.0),
              ConstrainedTextBox(data: 'Date2', minWidth: 80.0, fontSize: 14.0),
              ConstrainedTextBox(
                  data: 'Complete', minWidth: 80.0, fontSize: 14.0),
              Text('')
            ]));
  }
}
