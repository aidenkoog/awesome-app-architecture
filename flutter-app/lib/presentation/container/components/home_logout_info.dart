import 'package:flutter/material.dart';

class HomeLogoutInfo extends StatelessWidget {
  final String logoutInfo;

  const HomeLogoutInfo({
    Key? key,
    required this.logoutInfo,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(mainAxisAlignment: MainAxisAlignment.start, children: [
          const SizedBox(
            width: 80,
          ),
          InkWell(
            onTap: () => {},
            child: Center(
              child: Text(
                logoutInfo,
                style: const TextStyle(color: Colors.black, fontSize: 14),
              ),
            ),
          ),
        ]));
  }
}
