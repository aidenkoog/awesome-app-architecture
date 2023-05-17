import 'package:flutter/material.dart';

import '../../../../model/customer.dart';
import '../../common/contrained_text_box.dart';

class CustomerListItem extends StatelessWidget {
  const CustomerListItem(this.customer, {super.key});

  final Customer customer;

  @override
  Widget build(BuildContext context) {
    return Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
      const Text(''),
      ConstrainedTextBox(data: customer.type, minWidth: 40.0),
      ConstrainedTextBox(data: customer.name, minWidth: 50.0),
      ConstrainedTextBox(data: customer.deviceCount.toString(), minWidth: 20.0),
      ConstrainedTextBox(data: customer.desiredDate, minWidth: 80.0),
      ConstrainedTextBox(data: customer.workedDate, minWidth: 80.0),
      ConstrainedTextBox(data: customer.workedCondition, minWidth: 80.0),
      const Text('')
    ]);
  }
}
