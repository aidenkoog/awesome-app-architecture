import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../../../controller/customer_controller.dart';
import '../../../../controller/event_controller.dart';
import '../../../responsive/responsive_left.dart';
import 'customer_card.dart';
import 'customer_list.dart';
import 'customer_list_paginator.dart';
import 'customer_list_title.dart';

class CustomerPage extends StatelessWidget {
  CustomerPage({Key? key}) : super(key: key);

  final victimController = Get.put(CustomerController());
  final eventController = Get.put(EventController());

  @override
  Widget build(BuildContext context) {
    return ResponsiveLeft(
        maxContentWidth: 1200,
        child: Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
          Flexible(
              flex: 3,
              child: Container(
                  padding: const EdgeInsets.all(16),
                  child: Column(children: [
                    Container(
                        padding: const EdgeInsets.symmetric(vertical: 0.0),
                        child: const CustomerListTitle()),
                    Container(
                        padding: const EdgeInsets.symmetric(vertical: 8.0),
                        child: const CustomerList()),
                    Container(
                        padding: const EdgeInsets.symmetric(vertical: 0.0),
                        child: const CustomerListPaginator())
                  ]))),
          Flexible(
              flex: 2,
              child: Container(
                  margin: const EdgeInsets.all(16),
                  child: const CustomerCard()))
        ]));
  }
}
