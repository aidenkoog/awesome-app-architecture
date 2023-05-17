import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../../controller/customer_controller.dart';
import '../../../../number_paginator/model/config.dart';
import '../../../../number_paginator/ui/number_paginator.dart';

class CustomerListPaginator extends StatefulWidget {
  const CustomerListPaginator({Key? key}) : super(key: key);

  @override
  State<CustomerListPaginator> createState() => _CustomerListPaginatorState();
}

class _CustomerListPaginatorState extends State<CustomerListPaginator> {
  @override
  Widget build(BuildContext context) {
    return GetX(
        init: CustomerController(),
        builder: (customerController) => NumberPaginator(
            numberPages: customerController.totalPages,
            onPageChange: (int page) {
              setState(() {
                customerController.setPage(page);
              });
            },
            config: NumberPaginatorUIConfig(
                buttonShape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(3.0)),
                height: 32,
                contentPadding: const EdgeInsets.symmetric(horizontal: 1.0),
                buttonSelectedForegroundColor: Colors.white,
                buttonUnselectedForegroundColor: Colors.black,
                buttonUnselectedBackgroundColor: Colors.grey[300],
                buttonSelectedBackgroundColor: Colors.lightBlue)));
  }
}
