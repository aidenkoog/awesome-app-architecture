import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../../controller/customer_controller.dart';
import '../../common/contrained_text_box.dart';

class CustomerCard extends StatelessWidget {
  const CustomerCard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetX<CustomerController>(builder: (customerController) {
      return Container(
          padding: const EdgeInsets.all(32),
          decoration: BoxDecoration(
              color: Colors.grey[100],
              borderRadius: BorderRadius.circular(10.0),
              boxShadow: [
                BoxShadow(
                    color: Colors.black.withOpacity(0.5),
                    blurRadius: 5,
                    spreadRadius: 1)
              ]),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(mainAxisAlignment: MainAxisAlignment.start, children: [
              const Icon(Icons.circle, size: 8, color: Colors.lightBlue),
              ConstrainedTextBox(
                  data: Get.find<CustomerController>().view.isNotEmpty
                      ? ' ${Get.find<CustomerController>().view[customerController.choice].name} '
                      : '',
                  color: Colors.black,
                  minWidth: 0.0,
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                  textAlign: TextAlign.left),
              ConstrainedTextBox(
                  data: '(Customer)',
                  color: Colors.grey[600],
                  minWidth: 0.0,
                  fontSize: 16.0,
                  textAlign: TextAlign.left)
            ]),
            Divider(height: 1.0, color: Colors.grey[600]),
            const Text(''),
            Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
              Flexible(
                  flex: 2,
                  child: Row(children: [
                    Icon(Icons.add, size: 16, color: Colors.grey[600]),
                    ConstrainedTextBox(
                        data: 'Address',
                        color: Colors.grey[600],
                        minWidth: 0.0,
                        fontSize: 14.0,
                        textAlign: TextAlign.left)
                  ])),
              Flexible(
                  flex: 3,
                  child: Text(
                      Get.find<CustomerController>().view.isNotEmpty
                          ? Get.find<CustomerController>()
                              .view[customerController.choice]
                              .address
                          : '',
                      style: const TextStyle(fontSize: 12.0),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis))
            ]),
            const Text(''),
            Divider(height: 1.0, color: Colors.grey[600]),
            const Text(''),
            Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
              Flexible(
                  flex: 2,
                  child: Row(children: [
                    Icon(Icons.add, size: 16, color: Colors.grey[600]),
                    ConstrainedTextBox(
                        data: 'Tel. ',
                        color: Colors.grey[600],
                        minWidth: 0.0,
                        fontSize: 14.0,
                        textAlign: TextAlign.left)
                  ]))
            ]),
            Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
              Flexible(
                  flex: 2,
                  child: Row(children: [
                    Icon(Icons.add, size: 16, color: Colors.grey[600]),
                    ConstrainedTextBox(
                        data: 'Agency',
                        color: Colors.grey[600],
                        minWidth: 0.0,
                        fontSize: 14.0,
                        textAlign: TextAlign.left)
                  ]))
            ]),
            Row(mainAxisAlignment: MainAxisAlignment.start, children: [
              Flexible(
                  flex: 2,
                  child: Row(children: [
                    Icon(Icons.add, size: 16, color: Colors.grey[600]),
                    ConstrainedTextBox(
                        data: 'Person ',
                        color: Colors.grey[600],
                        minWidth: 0.0,
                        fontSize: 14.0,
                        textAlign: TextAlign.left)
                  ])),
            ]),
            const Text(''),
            Row(mainAxisAlignment: MainAxisAlignment.start, children: const [
              Icon(Icons.circle, size: 8, color: Colors.lightBlue),
              ConstrainedTextBox(
                  data: ' Q&A',
                  color: Colors.black,
                  minWidth: 0.0,
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                  textAlign: TextAlign.left)
            ]),
            Divider(height: 1.0, color: Colors.grey[600]),
            const Text(''),
            Row(mainAxisAlignment: MainAxisAlignment.start, children: [
              ConstrainedTextBox(
                  data: Get.find<CustomerController>().view.isNotEmpty
                      ? Get.find<CustomerController>()
                          .view[customerController.choice]
                          .comment
                      : '',
                  color: Colors.black,
                  minWidth: 0.0,
                  fontSize: 12.0,
                  fontWeight: FontWeight.normal,
                  textAlign: TextAlign.left)
            ])
          ]));
    });
  }
}
