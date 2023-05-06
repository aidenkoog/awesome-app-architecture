import 'package:dartz/dartz.dart';

import '../../core/errors/failures.dart';
import '../entities/customer.dart';

abstract class EventRepository {
  Future<Either<Failure, Customer>> getEventList();
}
