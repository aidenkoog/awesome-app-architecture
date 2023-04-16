import 'package:flutter/material.dart';

class HomeTitle extends StatelessWidget {
  final String mainTitle;
  final Image mainLogo;
  final VoidCallback onTabCallback;

  const HomeTitle(
      {Key? key,
      required this.mainTitle,
      required this.mainLogo,
      required this.onTabCallback})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
        onTap: () => {onTabCallback()},
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            const SizedBox(
              width: 85,
            ),
            mainLogo,
            Container(
                padding: const EdgeInsets.all(8.0),
                child: Text(mainTitle,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                        fontSize: 25)))
          ],
        ));
  }
}
