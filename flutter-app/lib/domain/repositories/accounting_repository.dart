import 'package:dartz/dartz.dart';

import '../../core/errors/failures.dart';
import '../entities/customer.dart';

abstract class AccountingRepository {
  Future<Either<Failure, Customer>> getAccountingList();
}
