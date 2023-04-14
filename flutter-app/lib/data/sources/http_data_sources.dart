import 'dart:convert';
import 'package:http/http.dart' as http;
import '../../core/errors/exceptions.dart';
import '../../domain/entities/customer.dart';
import '../models/result_model.dart';

abstract class HttpDataSource {
  Future<ResultModel> getCustomerList();
  Future<ResultModel> registerCustomer(Customer customer);
}

class HttpDataSourceImpl implements HttpDataSource {
  final http.Client httpClient;

  HttpDataSourceImpl({required this.httpClient});

  @override
  Future<ResultModel> registerCustomer(Customer customer) =>
      _registerCustomer(customer);

  @override
  Future<ResultModel> getCustomerList() => _getCustomerList('url');

  Future<ResultModel> _getCustomerList(String url) async {
    final response = await httpClient.get(
      url as Uri,
      headers: {
        'Content-Type': 'application/json',
      },
    );
    if (response.statusCode == 200) {
      return ResultModel.fromJson(json.decode(response.body));
    } else {
      throw ServerException();
    }
  }

  Future<ResultModel> _registerCustomer(Customer customer) async {
    return ResultModel.fromJson(json.decode(''));
  }
}
