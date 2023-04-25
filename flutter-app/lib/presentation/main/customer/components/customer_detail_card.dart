import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/presentation/components/button/custom_normal_button.dart';

class CustomerDetailCard extends StatelessWidget {
  final Color color;
  final String title;
  final String contentTitle;
  final String? description;
  final bool hasTitleButton;
  const CustomerDetailCard(
      {Key? key,
      required this.color,
      required this.title,
      required this.description,
      required this.contentTitle,
      required this.hasTitleButton})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        width: 200,
        height: 90,
        margin: const EdgeInsets.only(left: 5),
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
            color: Colors.white,
            border: Border.all(
                color: const Color.fromRGBO(0, 0, 0, 0.12), width: 1.1),
            borderRadius: const BorderRadius.all(Radius.circular(12))),
        child: Column(children: [
          Row(children: [
            Text(title, style: TextStyle(color: color, fontSize: 11)),
            const SizedBox(width: 5),
            hasTitleButton
                ? CustomNormalButton(
                    buttonText: 'OK',
                    callback: () {},
                    backgroundColor: color,
                    height: 20,
                    width: 40,
                    fontSize: 10)
                : Container()
          ]),
          const SizedBox(height: 8),
          Row(children: [
            Icon(Icons.check_circle_rounded, color: color),
            const SizedBox(width: 5),
            Text(contentTitle, style: TextStyle(color: color, fontSize: 11))
          ]),
          description == null
              ? Container()
              : Container(
                  alignment: Alignment.centerLeft,
                  margin: const EdgeInsets.only(left: 30),
                  child: Text(description!,
                      style: TextStyle(fontSize: 11, color: color)))
        ]));
  }
}
