import 'package:flutter/material.dart';

import '../../../../assets/strings/strings.dart';
import '../../../components/textfield/custom_text_field.dart';

class QnaAnswer extends StatelessWidget {
  const QnaAnswer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Container(
          margin: const EdgeInsets.fromLTRB(0, 30, 0, 20),
          alignment: Alignment.centerLeft,
          child: const Text(qnaAnswerInputBoxTitle,
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w900,
                  color: Colors.black))),
      const CustomTextField(contentMessage: qnaAnswerInputBoxContentText)
    ]);
  }
}
