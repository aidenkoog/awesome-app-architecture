import 'dart:async';

import 'package:flutter/cupertino.dart';

import '../services/hive_storage_service.dart';
import '../presentation/theme/theme_model.dart';

typedef OnSignOutCompletionCallback = void Function(bool);

void signOut(OnSignOutCompletionCallback callback) async {
  Timer(const Duration(seconds: 1), () async {
    await HiveDataStorageService.signOut();
    callback(true);
  });
}

typedef OnSignInStateCallback = void Function(String);

const signInStarted = "sign_in_started";
const signInCompleted = "sign_in_completed";

void signIn(
    OnSignInStateCallback callback, GlobalKey<FormState> formKey) async {
  if (formKey.currentState!.validate()) {
    callback(signInStarted);

    Timer(const Duration(seconds: 1), () async {
      await setupWindowSize();
      await HiveDataStorageService.signIn();

      callback(signInCompleted);
    });
  }
}
