import 'package:get/get.dart';

class InventoryController extends GetxController {
  final RxInt _temp = 1000.obs;

  int get temp => _temp.value;

  void setTemp(int tempValue) {
    _temp(temp);
  }

  void setHover(int temp) {
    _temp(temp);
  }
}
