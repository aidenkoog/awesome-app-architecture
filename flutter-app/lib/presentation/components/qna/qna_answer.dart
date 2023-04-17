import 'package:flutter/material.dart';
import '../custom/textfield/custom_text_field.dart';

class QnaAnswer extends StatelessWidget {
  const QnaAnswer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      // answer textfield title.
      Container(
        margin: const EdgeInsets.fromLTRB(0, 30, 0, 20),
        alignment: Alignment.centerLeft,
        child: const Text(
          'Answer',
          style: TextStyle(
              fontSize: 18, fontWeight: FontWeight.w900, color: Colors.black),
        ),
      ),

      // answer textfield.
      const CustomTextField(
        contentMessage: '',
      ),
    ]);
  }
}
