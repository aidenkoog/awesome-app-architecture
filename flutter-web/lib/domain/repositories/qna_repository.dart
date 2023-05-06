import 'package:dartz/dartz.dart';

import '../../core/errors/failures.dart';
import '../entities/customer.dart';

abstract class QnaRepository {
  Future<Either<Failure, Customer>> getQnaList();
}
