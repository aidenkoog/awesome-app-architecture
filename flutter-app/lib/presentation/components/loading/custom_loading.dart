import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class CustomLoading extends StatelessWidget {
  const CustomLoading({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.center,
      children: const <Widget>[
        SizedBox(
          height: 230,
        ),

        // animated loading indicator.
        SpinKitRing(
          color: Colors.lightBlue,
          lineWidth: 10,
          size: 180,
        ),
        SizedBox(
          height: 85,
        ),

        // loading message.
        Text(
          'Loading...',
          style: TextStyle(fontSize: 25, fontWeight: FontWeight.w700),
        ),
      ],
    ));
  }
}
