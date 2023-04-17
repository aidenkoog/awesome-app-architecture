import 'package:flutter/material.dart';

import '../../button/custom_normal_button.dart';
import '../form/custom_radio_button.dart';
import 'custom_input_form.dart';

class CustomDrawerContentForm extends StatefulWidget {
  final String formTitle;
  const CustomDrawerContentForm({Key? key, required this.formTitle})
      : super(key: key);

  @override
  State<CustomDrawerContentForm> createState() =>
      _CustomDrawerContentFormState();
}

class _CustomDrawerContentFormState extends State<CustomDrawerContentForm> {
  @override
  Widget build(BuildContext context) {
    return Expanded(
        flex: 8,
        child: Container(
            padding: const EdgeInsets.fromLTRB(15, 0, 15, 15),
            color: Colors.white,
            child: Column(
              children: [
                // top space.
                const SizedBox(
                  height: 30,
                ),

                // content form title.
                Container(
                    alignment: Alignment.topLeft,
                    child: Text(
                      widget.formTitle,
                      style: const TextStyle(
                          color: Colors.black,
                          fontSize: 23,
                          fontWeight: FontWeight.w900),
                    )),

                // content top divider.
                const SizedBox(
                    width: 800,
                    child: Divider(color: Colors.red, thickness: 2.0)),

                // content input form.
                const CustomInputForm(label: 'ID', placeHolder: '2~20'),
                const CustomInputForm(label: 'Name', placeHolder: '2~10'),
                const CustomInputForm(
                    label: 'Phone Number', placeHolder: 'only number'),
                const CustomInputForm(
                    label: 'Phone Number2', placeHolder: 'only number'),
                const CustomRadioButton(
                    firstName: 'A', secondName: 'B', label: 'Network'),
                const CustomInputForm(
                    label: 'Address', placeHolder: 'search address'),
                const CustomInputForm(
                    label: 'Date', placeHolder: 'year. month. day.'),
                const CustomInputForm(
                    label: 'Date2', placeHolder: 'year. month. day.'),
                const CustomInputForm(
                    label: 'Device', placeHolder: 'device count'),
                const CustomInputForm(
                    label: 'Device2', placeHolder: 'device count'),
                const CustomInputForm(
                    label: 'Description1', placeHolder: 'etc description 1'),
                const CustomInputForm(
                    label: 'Description2', placeHolder: 'etc description 2'),
                const CustomInputForm(
                    label: 'Description3', placeHolder: 'etc description 3'),

                // next button.
                Container(
                    alignment: Alignment.centerRight,
                    margin: const EdgeInsets.fromLTRB(0, 0, 70, 0),
                    child: CustomNormalButton(
                        buttonText: 'Next', callback: () => {}))
              ],
            )));
  }
}
