import 'package:get/get.dart';

import '../data/services.dart';
import '../model/customer.dart';

class CustomerController extends GetxController {
  static const int listCount = 10;

  late var _customers = <Customer>[];
  late int _customerCount;

  final _view = <Customer>[].obs;
  final RxInt _choice = 0.obs;
  final RxInt _page = 0.obs;
  final RxInt _totalPages = 1.obs;

  @override
  void onInit() {
    super.onInit();
    fetchData();
  }

  void _refreshCustomersView() {
    _choice(0);
    _view.assignAll(_customers.getRange(
        page * listCount,
        (page * listCount + listCount) > (_customerCount)
            ? (_customerCount)
            : (page * listCount + listCount)));
  }

  RxList<Customer> get view => _view;
  int get choice => _choice.value;
  int get page => _page.value;
  int get totalPages => _totalPages.value;

  void setChoice(int choice) => _choice(choice);

  void setPage(int page) {
    _page(page);
    _refreshCustomersView();
  }

  void fetchData() async {
    var customers = await Services.fetchCustomerData();

    if (customers != null) {
      _customers = customers;
      _customerCount = _customers.length;
      _page(0);
      _totalPages((_customerCount / listCount + 1).toInt());
      _refreshCustomersView();
    }
  }
}
