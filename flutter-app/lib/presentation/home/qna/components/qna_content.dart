import 'package:flutter/material.dart';

import '../../../../assets/strings/strings.dart';
import '../../../components/textfield/custom_text_field.dart';

class QnaContent extends StatelessWidget {
  const QnaContent({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Container(
          alignment: Alignment.centerLeft,
          margin: const EdgeInsets.fromLTRB(0, 30, 0, 20),
          child: Expanded(
              child: Row(children: const [
            Text(qnaContentInputBoxTitle,
                style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w900,
                    color: Colors.black)),
            SizedBox(width: 7),
            Text(qnaContentInputBoxTitle2,
                style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w900,
                    color: Colors.black))
          ]))),
      const CustomTextField(contentMessage: qnaContentInputBoxContentText)
    ]);
  }
}
