import 'package:equatable/equatable.dart';

class Event extends Equatable {
  final String region;
  final String agency;
  final String subjectName;
  final String address;
  final int emerCallCount;
  final int wanderCount;
  final int invasionCount;
  final int fightCount;
  final int facialRecogCount;
  final int testCount;

  const Event({
    required this.region,
    required this.agency,
    required this.subjectName,
    required this.address,
    required this.emerCallCount,
    required this.wanderCount,
    required this.invasionCount,
    required this.fightCount,
    required this.facialRecogCount,
    required this.testCount,
  });

  @override
  List<Object> get props => [
        region,
        agency,
        subjectName,
        address,
        emerCallCount,
        wanderCount,
        invasionCount,
        fightCount,
        facialRecogCount,
        testCount,
      ];
}
