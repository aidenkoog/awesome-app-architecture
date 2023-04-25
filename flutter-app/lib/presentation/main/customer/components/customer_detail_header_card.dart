import 'package:flutter/material.dart';

class CustomerDetailHeaderCard extends StatelessWidget {
  final Color color;
  final String title;
  final String date;
  const CustomerDetailHeaderCard(
      {Key? key, required this.color, required this.title, required this.date})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        width: 100,
        height: 70,
        margin: const EdgeInsets.only(left: 5),
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
            color: color,
            border: Border.all(
                color: const Color.fromRGBO(0, 0, 0, 0.12), width: 1.1),
            borderRadius: const BorderRadius.all(Radius.circular(12))),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text(title,
              style: const TextStyle(color: Colors.white, fontSize: 14)),
          const SizedBox(height: 6),
          Text(date, style: const TextStyle(color: Colors.white, fontSize: 11))
        ]));
  }
}
