import 'package:dartz/dartz.dart';

import '../../core/errors/failures.dart';
import '../entities/customer.dart';

abstract class InventoryRepository {
  Future<Either<Failure, Customer>> getInventoryList();
}
