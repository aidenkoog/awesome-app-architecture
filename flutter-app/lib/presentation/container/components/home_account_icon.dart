import 'package:flutter/material.dart';

class HomeAccountIcon extends StatelessWidget {
  final Image accountIcon;
  final String accountId;
  final VoidCallback callback;

  const HomeAccountIcon({
    Key? key,
    required this.accountIcon,
    required this.accountId,
    required this.callback,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: InkWell(
        onTap: () => callback(),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            const SizedBox(
              width: 20,
            ),
            accountIcon,
            Container(
                padding: const EdgeInsets.all(8.0),
                child: Text(accountId,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                        fontSize: 18))),
            const SizedBox(
              width: 150,
            ),
          ],
        ),
      ),
    );
  }
}
