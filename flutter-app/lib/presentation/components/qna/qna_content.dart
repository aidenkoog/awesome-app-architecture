import 'package:flutter/material.dart';
import '../custom/textfield/custom_text_field.dart';

class QnaContent extends StatelessWidget {
  const QnaContent({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      // content textfield title.
      Container(
        alignment: Alignment.centerLeft,
        margin: const EdgeInsets.fromLTRB(0, 30, 0, 20),
        child: Expanded(
            child: Row(
          children: const [
            Text(
              'Content',
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w900,
                  color: Colors.black),
            ),
            SizedBox(
              width: 7,
            ),
            Text(
              '(000-0000-0000)',
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w900,
                  color: Colors.black),
            )
          ],
        )),
      ),

      // content textfield.
      const CustomTextField(
        contentMessage: '',
      )
    ]);
  }
}
