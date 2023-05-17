import 'dart:convert';
import 'package:admin_website/model/customer.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart' show ByteData, rootBundle;

class Services {
  static Future<List<Customer>?> fetchCustomerData() async {
    ByteData dummyByteData = await rootBundle.load('asset/dummy_data.txt');

    var bytes = dummyByteData.buffer
        .asUint8List(dummyByteData.offsetInBytes, dummyByteData.lengthInBytes);
    var contentString = utf8.decode(bytes);

    Iterable<String> contentIterableList = LineSplitter.split(contentString);
    List<Customer> customerList = <Customer>[];

    for (final content in contentIterableList) {
      List<String> rowData = content.split('|');
      try {
        customerList.add(Customer(
            type: rowData[0],
            name: rowData[1],
            address: rowData[2],
            deviceCount: int.parse(rowData[3]),
            desiredDate: rowData[4],
            workedDate: rowData[5],
            workedCondition: rowData[6],
            comment: rowData[7]));
      } on FormatException catch (e) {
        if (kDebugMode) {
          print("FormatException operation$e");
        }
      } catch (ex) {
        if (kDebugMode) {
          print(ex.toString());
        }
      }
    }
    return customerList;
  }
}
