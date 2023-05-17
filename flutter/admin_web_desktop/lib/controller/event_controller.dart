import 'package:get/get.dart';

class EventController extends GetxController {
  final RxInt _hover = (-1).obs;

  int get hover => _hover.value;

  void setHover(int hover) => _hover(hover);
}
