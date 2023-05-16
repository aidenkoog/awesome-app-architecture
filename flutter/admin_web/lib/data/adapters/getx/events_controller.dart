import 'package:get/get.dart';

class EventController extends GetxController {
  final RxInt _temp = 1000.obs;

  int get temp => _temp.value;

  void setTemp(int tempValue) {
    _temp(temp);
  }

  void setHover(int temp) {
    _temp(temp);
  }
}
