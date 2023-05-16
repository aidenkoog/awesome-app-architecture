import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

import '../models/user_model.dart';

class BookmarkController extends GetxController {
  final GetStorage box = GetStorage();
  RxList bookMarkedUserList = [].obs;

  @override
  onInit() {
    super.onInit();
    loadSavedBookMarks();
  }

  loadSavedBookMarks() {
    dynamic boorMarkList = box.read("bookMarkedUserList");
    if (boorMarkList != null) {
      List items =
          List.from(boorMarkList.map((item) => UserModel.fromJson(item)));
      bookMarkedUserList.addAll(items);
    }
  }

  syncSaveBoorMarkData() {
    List saveData = bookMarkedUserList.map((item) => item.toJson()).toList();
    box.write("bookMarkedUserList", saveData);
  }

  addBookMark(UserModel imageModel) {
    if (!bookMarkedUserList.contains(imageModel)) {
      bookMarkedUserList.add(imageModel);
    } else {
      bookMarkedUserList.remove(imageModel);
    }
    syncSaveBoorMarkData();
  }
}
