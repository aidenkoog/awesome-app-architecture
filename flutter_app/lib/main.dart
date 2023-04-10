import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: Scaffold(
          appBar: AppBar(),
          body: ElevatedButton(
            child: const Text('EveText'),
            onPressed: () {
              Fluttertoast.showToast(
                  msg: "Test Toast !!!!!!!!!!!!!!!!!!!",
                  toastLength: Toast.LENGTH_LONG,
                  gravity: ToastGravity.CENTER_RIGHT,
                  timeInSecForIosWeb: 1,
                  backgroundColor: Colors.red,
                  textColor: Colors.black,
                  fontSize: 20);
            },
          ),
        ));
  }
}
