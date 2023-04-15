import 'package:flutter/material.dart';

class CustomRightDrawer extends StatelessWidget {
  // ignore: prefer_typing_uninitialized_variables
  final parentScaffoldKey;

  const CustomRightDrawer({Key? key, required this.parentScaffoldKey})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: <Widget>[
          ListTile(
            dense: true,
            title: const Text('Test Item By AidenKooG'),
            onTap: () {
              ScaffoldMessenger.of(parentScaffoldKey.currentContext)
                  .showSnackBar(const SnackBar(
                      content: Text('Error. Could not log out')));
            },
          ),
        ],
      ),
    );
  }
}
