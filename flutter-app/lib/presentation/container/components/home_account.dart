import 'package:flutter/material.dart';

class HomeAccount extends StatelessWidget {
  final String accountId;

  const HomeAccount({
    Key? key,
    required this.accountId,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(3),
      child: InkWell(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            const SizedBox(
              width: 20,
            ),
            Container(
                padding: const EdgeInsets.all(8.0),
                child: Text(accountId,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                        fontSize: 18))),
          ],
        ),
      ),
    );
  }
}
