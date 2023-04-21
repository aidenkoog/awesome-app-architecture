import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/main/qna/components/qna_answer.dart';
import 'package:flutter_web_navigation/presentation/main/qna/components/qna_content.dart';
import 'package:flutter_web_navigation/presentation/main/qna/components/qna_header.dart';

import '../../../../assets/strings/strings.dart';
import '../../../components/button/custom_normal_button.dart';

class QnaForm extends StatelessWidget {
  final Color? buttonBackgroundColor;
  const QnaForm({Key? key, required this.buttonBackgroundColor})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
        flex: 1,
        child: Container(
            padding: const EdgeInsets.all(20),
            child: Column(children: [
              const QnaHeader(
                  phoneNumber: qnaHeaderTitle, agencyName: qnaAgencyName),
              const SizedBox(
                  child: Divider(color: Colors.grey, thickness: 1.5)),
              const QnaContent(),
              const QnaAnswer(),
              Container(
                  margin: const EdgeInsets.fromLTRB(0, 30, 0, 0),
                  alignment: Alignment.centerRight,
                  child: CustomNormalButton(
                      buttonText: qnaNextBtnText,
                      callback: () => {},
                      backgroundColor: buttonBackgroundColor ??
                          const Color.fromRGBO(0, 116, 227, 1)))
            ])));
  }
}
