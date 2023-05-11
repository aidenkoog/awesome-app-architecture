import 'package:flutter/cupertino.dart';
import 'package:get_storage/get_storage.dart';
import 'package:flutter_app_architecture/models/user_model.dart';
import 'package:flutter_app_architecture/utils/log_util.dart';
import 'package:test/test.dart';

void main() {
  test('get storage normal test', () {
    WidgetsFlutterBinding.ensureInitialized();
    final GetStorage box = GetStorage();

    const boxKey = "AidenKooG";
    box.write(boxKey, "AidenKooG");

    dynamic boxKeyValue = box.read(boxKey);
    String result = boxKeyValue.toString();
    logd("getStorageTest", "result: $result");

    expect(result, "AidenKooG");
  });

  test('get storage object test', () {
    WidgetsFlutterBinding.ensureInitialized();
    final GetStorage box = GetStorage();

    const boxKey = "AidenKooG";

    List bookMarkedUserList = [
      const UserModel(
          userId: 100, id: 1000, title: "test title", body: "test body")
    ];

    List list = bookMarkedUserList.map((item) => item.toJson()).toList();
    box.write(boxKey, list);

    dynamic boxKeyValue = box.read(boxKey);
    List items = List.from(boxKeyValue.map((item) => UserModel.fromJson(item)));

    logd("getStorageTest", "result: items length: ${items.length}");
    logd("getStorageTest", "result: items[0]: ${items[0].collection}");

    expect(items[0].collection, "test");
  });
}
