import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/components/custom/textfield/custom_text_field.dart';
import 'package:flutter_web_navigation/presentation/components/qna/qna_answer.dart';
import 'package:flutter_web_navigation/presentation/components/qna/qna_content.dart';
import 'package:flutter_web_navigation/presentation/components/qna/qna_header.dart';

import '../custom/button/custom_normal_button.dart';

class QnaForm extends StatelessWidget {
  const QnaForm({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
        flex: 1,
        child: Container(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                // qna header title.
                const QnaHeader(
                    phoneNumber: '000-0000-0000', agencyName: 'SEOUL AGENCY'),

                // qna divider between title and content.
                const SizedBox(
                    child: Divider(color: Colors.grey, thickness: 1.5)),

                // qna content.
                const QnaContent(),

                // qna answer.
                const QnaAnswer(),

                // register button.
                Container(
                    margin: const EdgeInsets.fromLTRB(0, 30, 0, 0),
                    alignment: Alignment.centerRight,
                    child: CustomNormalButton(
                        buttonText: 'Next', callback: () => {}))
              ],
            )));
  }
}
