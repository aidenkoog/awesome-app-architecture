import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_web_navigation/domain/repositories/customer_repository.dart';
import '../../../../core/usecases/usecase.dart';
import '../../../core/errors/failures.dart';
import '../../entities/customer.dart';

class LoginUseCase implements UseCase<Customer, Params> {
  final CustomerRepository repository;

  LoginUseCase(this.repository);

  @override
  Future<Either<Failure, Customer>> call(Params params) async {
    return await repository.getCustomerList();
  }
}

class Params extends Equatable {
  final Customer customer;

  const Params({required this.customer});

  @override
  List<Object> get props => [customer];
}
