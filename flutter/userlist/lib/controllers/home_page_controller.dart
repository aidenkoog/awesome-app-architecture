import 'dart:io';

import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

import '../assets/strings/strings.dart';
import '../models/user_model.dart';
import '../presentation/widgets/snackbar/snack_bar.dart';
import 'bookmark_controller.dart';

Map<String, String> headers = {
  HttpHeaders.contentTypeHeader: 'application/json;charset=UTF-8',
  HttpHeaders.acceptHeader: 'application/json'
};
const int pageSize = 20;

class HomePageController extends GetConnect {
  RxString searchText = "".obs;
  RxList userList = [].obs;

  RxInt currentPage = 1.obs;

  final BookmarkController homePageController = Get.find();

  onPressSearchImage() async {
    userList.clear();
    currentPage.value = 1;
    await fetchData();
  }

  Future<dynamic> fetchData() async {
    Response response = await get('https://jsonplaceholder.typicode.com/posts',
        headers: headers);

    int? statusCode = response.statusCode;
    if (statusCode == null) {
      showSnackBar(snackBarErrorTitle, searchFailureByUnknownError);
      return null;
    }
    switch (statusCode) {
      case 200:
        var responseList = response.body as List;

        List<UserModel> userDataList = responseList
            .map<UserModel>((json) => UserModel.fromJson(json))
            .toList();

        updateBookmarkState(userDataList);

        if (userList.isEmpty && userDataList.isNotEmpty) {
          showSnackBar(snackBarNormalTitle,
              "$searchResultPrefix ${searchText.value} ($searchSuccessMessage)");
        } else if (currentPage.value == 1 && userDataList.isEmpty) {
          showSnackBar(snackBarErrorTitle,
              "$searchResultPrefix ${searchText.value} ($searchFailureMessage)");
        }
        userList.addAll(userDataList);
        return null;

      default:
        showSnackBar(snackBarErrorTitle, searchFailureByUnknownError);
        return null;
    }
  }

  updateBookmarkState(List<UserModel> imageDataList) {
    final GetStorage box = GetStorage();
    dynamic boorMarkList = box.read("bookMarkedUserList");

    if (boorMarkList != null) {
      List<UserModel> bookMarkedList =
          List.from(boorMarkList.map((item) => UserModel.fromJson(item)));
      for (UserModel model in imageDataList) {
        if (bookMarkedList.contains(model)) {
          if (!homePageController.bookMarkedUserList.contains(model)) {
            homePageController.bookMarkedUserList.add(model);
          }
        }
      }
    } else {
      return;
    }
  }
}
