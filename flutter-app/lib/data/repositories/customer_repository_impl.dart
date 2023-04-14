import 'package:flutter_web_navigation/domain/entities/customer.dart';
import 'package:flutter_web_navigation/core/errors/failures.dart';
import 'package:dartz/dartz.dart';
import 'package:flutter_web_navigation/domain/repositories/customer_repository.dart';

class CustomerRepositoryImpl implements CustomerRepository {
  @override
  Future<Either<Failure, Customer>> getCustomerList() {
    throw UnimplementedError();
  }

  @override
  Future<Either<Failure, Customer>> registerCustomer(Customer customer) {
    throw UnimplementedError();
  }
}
