import 'package:flutter/material.dart';

class MainTitle extends StatelessWidget {
  final String mainTitle;
  final Image mainLogo;

  const MainTitle({Key? key, required this.mainTitle, required this.mainLogo})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
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
    );
  }
}
