import 'package:flutter/material.dart';

import '../../../../../../../assets/strings/strings.dart';
import '../../../../../../components/button/custom_normal_button.dart';
import 'web_input_form.dart';
import 'web_radio_button.dart';

class WebDrawerContentForm extends StatefulWidget {
  final String formTitle;
  const WebDrawerContentForm({Key? key, required this.formTitle})
      : super(key: key);

  @override
  State<WebDrawerContentForm> createState() => _WebDrawerContentFormState();
}

class _WebDrawerContentFormState extends State<WebDrawerContentForm> {
  @override
  Widget build(BuildContext context) {
    return Expanded(
        flex: 8,
        child: Container(
            padding: const EdgeInsets.fromLTRB(15, 0, 15, 15),
            color: Colors.white,
            child: Column(children: [
              const SizedBox(height: 30),
              Container(
                  alignment: Alignment.topLeft,
                  child: Text(widget.formTitle,
                      style: const TextStyle(
                          color: Colors.black,
                          fontSize: 23,
                          fontWeight: FontWeight.w900))),
              const SizedBox(
                  width: 800,
                  child: Divider(color: Colors.red, thickness: 2.0)),
              const WebInputForm(
                  label: customerDrawerFormItemId,
                  placeHolder: customerDrawerFormPlaceHolder),
              const WebInputForm(
                  label: customerDrawerFormItemName,
                  placeHolder: customerDrawerFormPlaceHolder),
              const WebInputForm(
                  label: customerDrawerFormItemPhoneNumber,
                  placeHolder: customerDrawerFormPlaceHolder),
              const WebInputForm(
                  label: customerDrawerFormItemPhoneNumber2,
                  placeHolder: customerDrawerFormPlaceHolder),
              const WebRadioButton(
                  firstName: customerDrawerFormItemRadioBtnA,
                  secondName: customerDrawerFormItemRadioBtnB,
                  label: customerDrawerFormItemRadioLabel),
              const WebInputForm(
                  label: customerDrawerFormItemAddress,
                  placeHolder: customerDrawerFormPlaceHolder),
              const WebInputForm(
                  label: customerDrawerFormItemDate,
                  placeHolder: customerDrawerFormPlaceHolder),
              const WebInputForm(
                  label: customerDrawerFormItemDate2,
                  placeHolder: customerDrawerFormPlaceHolder),
              const WebInputForm(
                  label: customerDrawerFormItemDevice,
                  placeHolder: customerDrawerFormPlaceHolder),
              const WebInputForm(
                  label: customerDrawerFormItemDevice2,
                  placeHolder: customerDrawerFormPlaceHolder),
              const WebInputForm(
                  label: customerDrawerFormItemDesc1,
                  placeHolder: customerDrawerFormPlaceHolder),
              const WebInputForm(
                  label: customerDrawerFormItemDesc2,
                  placeHolder: customerDrawerFormPlaceHolder),
              const WebInputForm(
                  label: customerDrawerFormItemDesc3,
                  placeHolder: customerDrawerFormPlaceHolder),
              Container(
                  alignment: Alignment.centerRight,
                  margin: const EdgeInsets.fromLTRB(0, 0, 70, 0),
                  child: CustomNormalButton(
                    buttonText: customerDrawerNextBtnText,
                    callback: () => {},
                    backgroundColor: Colors.blueGrey,
                    fontSize: 18,
                    height: 50,
                    width: 320,
                  ))
            ])));
  }
}
