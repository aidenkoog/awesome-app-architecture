import 'package:dartz/dartz.dart';

import '../../core/errors/failures.dart';
import '../entities/customer.dart';

abstract class AgencyRepository {
  Future<Either<Failure, Customer>> getAgencyList();
}
