import 'package:flutter/material.dart';

import '../../../utils/images.dart';

class MainLeftPanel extends StatelessWidget {
  final String sectionName;
  final String description;
  final String subDecription;

  const MainLeftPanel({
    Key? key,
    required this.sectionName,
    required this.description,
    required this.subDecription,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
        flex: 4,
        child: Container(
          margin: const EdgeInsets.fromLTRB(100, 20, 20, 100),
          padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              color: Colors.white.withOpacity(0.5),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: 10.0,
                  spreadRadius: 8,
                  offset: const Offset(
                    5.0,
                    5.0,
                  ),
                ),
              ]),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(
                height: 100,
              ),
              Image.asset(AllImages.flutterLogo, width: 300, height: 300),
              Text(
                sectionName,
                style: const TextStyle(
                    fontSize: 40,
                    fontWeight: FontWeight.w900,
                    color: Colors.blueGrey),
                textAlign: TextAlign.center,
              ),
              const SizedBox(
                height: 100,
              ),
              Text(
                description,
                style:
                    const TextStyle(fontSize: 30, fontWeight: FontWeight.w700),
                textAlign: TextAlign.center,
              ),
              InkWell(
                  onTap: () {},
                  child: Text(
                    subDecription,
                    style: TextStyle(fontSize: 18, color: Colors.green[900]),
                    textAlign: TextAlign.center,
                  )),
            ],
          ),
        ));
  }
}
