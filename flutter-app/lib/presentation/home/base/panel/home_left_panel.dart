import 'package:flutter/material.dart';

import '../../../components/table/xtable/custom_x_table.dart';

class HomeLeftPanel extends StatelessWidget {
  final String sectionName;
  final String description;
  final String subDecription;

  const HomeLeftPanel({
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
            margin: const EdgeInsets.fromLTRB(100, 20, 20, 70),
            padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                color: Colors.white.withOpacity(0.9),
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
            child: const CustomXTable(
              isMainTable: true,
            )));
  }
}
