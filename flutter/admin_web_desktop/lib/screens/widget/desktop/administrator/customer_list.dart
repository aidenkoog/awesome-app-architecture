import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../../controller/event_controller.dart';
import '../../../../controller/customer_controller.dart';
import 'customer_list_item.dart';

class CustomerList extends StatelessWidget {
  const CustomerList({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetX(
        init: CustomerController(),
        builder: (customerController) => ListView.builder(
            shrinkWrap: true,
            itemCount: customerController.view.length,
            itemBuilder: (context, index) {
              return GetX(
                  init: EventController(),
                  builder: (eventController) => GestureDetector(
                      onTap: () {
                        customerController.setChoice(index);
                      },
                      child: MouseRegion(
                          onEnter: (value) {
                            eventController.setHover(index);
                          },
                          onExit: (value) {
                            eventController.setHover(-1);
                          },
                          child: Container(
                              margin: const EdgeInsets.symmetric(vertical: 5.0),
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                  border: (customerController.choice == index)
                                      ? Border.all(
                                          width: 0, color: Colors.lightBlue)
                                      : null,
                                  color: (eventController.hover == index)
                                      ? Colors.yellow[50]
                                      : Colors.white,
                                  borderRadius: BorderRadius.circular(2.0),
                                  boxShadow: [
                                    BoxShadow(
                                        color: Colors.black.withOpacity(0.1),
                                        blurRadius: 5,
                                        spreadRadius: 1)
                                  ]),
                              child: CustomerListItem(
                                  customerController.view[index])))));
            }));
  }
}
