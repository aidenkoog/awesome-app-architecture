import 'package:get/get.dart';
import 'locale/en.dart';
import 'locale/ko.dart';

class Messages extends Translations {
  @override
  Map<String, Map<String, String>> get keys => {'ko_KR': koKR, 'en_US': enUS};
}
