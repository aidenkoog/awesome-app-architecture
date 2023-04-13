import 'package:flutter_web_navigation/services/hive/db.dart';

class HiveDataStorageService {
  static final HiveDataStorageService _instance = HiveDataStorageService._();

  static final HiveDataProvider _hiveDataProvider = HiveDataProvider();

  factory HiveDataStorageService() => _instance;

  HiveDataStorageService._();

  static logUserIn() async {
    await _hiveDataProvider.insertData("user", {"loggedIn": true});
  }

  static Future<bool> getUser() async {
    Map response = await _hiveDataProvider.readData("user");
    return ((response.isNotEmpty ? response["loggedIn"] : false) ?? false);
  }

  static logOutUser() async {
    await _hiveDataProvider.deleteData("user");
  }
}
