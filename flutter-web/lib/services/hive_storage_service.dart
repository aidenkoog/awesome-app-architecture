import 'package:flutter_web_navigation/services/hive/local_database.dart';

class HiveDataStorageService {
  static final HiveDataStorageService _instance = HiveDataStorageService._();

  static final HiveDataProvider _hiveDataProvider = HiveDataProvider();

  factory HiveDataStorageService() => _instance;

  HiveDataStorageService._();

  static signIn() async {
    await _hiveDataProvider.insertData("user", {"signIn": true});
  }

  static Future<bool> getUser() async {
    Map response = await _hiveDataProvider.readData("user");
    return ((response.isNotEmpty ? response["signIn"] : false) ?? false);
  }

  static signOut() async {
    await _hiveDataProvider.deleteData("user");
  }
}
