import 'package:flutter/material.dart';

class AdministratorMainTitle extends StatefulWidget {
  const AdministratorMainTitle({Key? key}) : super(key: key);

  @override
  State<AdministratorMainTitle> createState() => _AdministratorMainTitleState();
}

class _AdministratorMainTitleState extends State<AdministratorMainTitle> {
  var isSelected = true;
  late List<bool> selections;

  @override
  void initState() {
    selections = [isSelected, !isSelected];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 50.0),
        child:
            Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
          Row(mainAxisAlignment: MainAxisAlignment.start, children: [
            Icon(Icons.add_circle, color: Colors.grey[600], size: 32.0),
            const Text('Admin System',
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                    color: Colors.black)),
            const Text('  (Admin)  ',
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                    color: Colors.grey)),
            ToggleButtons(
                fillColor: Colors.lightBlue,
                borderColor: Colors.white,
                selectedColor: Colors.white,
                selectedBorderColor: Colors.lightBlue,
                isSelected: selections,
                onPressed: (index) {
                  if (index == 0) {
                    isSelected = true;
                  } else {
                    isSelected = false;
                  }
                  setState(() {
                    selections = [isSelected, !isSelected];
                  });
                },
                children: const [
                  Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16.0),
                      child: Text('Customer',
                          style: TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 18))),
                  Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16.0),
                      child: Text('Q&A',
                          style: TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 18)))
                ])
          ]),
          Row(children: [
            const Text('Logout : 100M 59S   '),
            const Text('admin1234',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
            Icon(Icons.account_circle, color: Colors.red[700], size: 32.0)
          ])
        ]));
  }
}
