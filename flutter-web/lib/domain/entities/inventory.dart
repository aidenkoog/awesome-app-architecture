import 'package:equatable/equatable.dart';

class Customer extends Equatable {
  final String serialNumber;
  final bool state;
  final String modelName;
  final String modelCategory;
  final int condition;

  const Customer({
    required this.serialNumber,
    required this.state,
    required this.modelName,
    required this.modelCategory,
    required this.condition,
  });

  @override
  List<Object> get props =>
      [serialNumber, state, modelName, modelCategory, condition];
}
