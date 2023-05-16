import 'dart:io';

import 'package:http/http.dart';
import 'package:flutter_app_architecture/utils/log_util.dart';
import 'package:test/test.dart';

void main() {
  test('rest-api using dummy uri 1', () async {
    Map<String, String> headers = {
      HttpHeaders.contentTypeHeader: 'application/json;charset=UTF-8',
      HttpHeaders.acceptHeader: 'application/json'
    };

    Response response = await get(
        Uri.parse('https://jsonplaceholder.typicode.com/posts'),
        headers: headers);

    int? statusCode = response.statusCode;
    logd("apiTest", "statusCode: $statusCode");
    expect(statusCode, 200);
  });

  test('rest-api using dummy uri 2', () async {
    Map<String, String> headers = {
      HttpHeaders.contentTypeHeader: 'application/json;charset=UTF-8',
      HttpHeaders.acceptHeader: 'application/json'
    };

    Response response = await get(
        Uri.parse('https://jsonplaceholder.typicode.com/posts'),
        headers: headers);

    int? statusCode = response.statusCode;
    logd("apiTest", "statusCode: $statusCode");
    expect(statusCode, 200);
  });

  // wrong uri
  test('rest-api using dummy uri 2', () async {
    Map<String, String> headers = {
      HttpHeaders.contentTypeHeader: 'application/json;charset=UTF-8',
      HttpHeaders.acceptHeader: 'application/json'
    };

    // missing query element
    Response response = await get(
        Uri.parse('https://jsonplaceholder.typicode.com/posts'),
        headers: headers);

    int? statusCode = response.statusCode;
    logd("apiTest", "statusCode: $statusCode");
    expect(statusCode != 200, true);
  });
}
