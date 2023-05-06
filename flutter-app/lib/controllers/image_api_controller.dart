import 'dart:convert';
import 'dart:io';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import '../models/image_model.dart';
import '../models/meta_model.dart';
import '../utils/global_constants.dart';

class ImageApiController extends GetxController {
  ImageApiController._();

  static final ImageApiController apiHelper = ImageApiController._();

  Map<String, String> headers = {
    HttpHeaders.contentTypeHeader: 'application/json;charset=UTF-8',
    HttpHeaders.acceptHeader: 'application/json',
    HttpHeaders.authorizationHeader: ''
  };

  Future<ImageModel?> fetchData() async {
    http.Response result = await http.get(
        Uri.parse('https://aidenkoog.com?q=${GlobalConstants.imageTitle}'),
        headers: headers);

    if (result.statusCode == 200) {
      // meta
      Map decodeData = jsonDecode(result.body);
      MetaModel metaData = MetaModel.fromJson(decodeData['meta']);

      // documents
      var documents = decodeData["documents"] as List;
      List<ImageModel> imageDataList = documents
          .map<ImageModel>((json) => ImageModel.fromJson(json))
          .toList();

      return imageDataList[0];
    }
    update();
    return null;
  }
}
