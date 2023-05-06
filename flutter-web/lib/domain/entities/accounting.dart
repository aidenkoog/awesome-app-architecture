import 'package:equatable/equatable.dart';

class Accounting extends Equatable {
  final String settleDate;
  final String region;
  final String agency;
  final String subjectName;
  final int cameraCount;
  final int aiBoxCount;
  final String installer;
  final String demolCompany;
  final String applyDate;
  final String applyCompletionDate;
  final String cancelApplicationDate;
  final String cancelCompletionDate;

  const Accounting(
      {required this.settleDate,
      required this.region,
      required this.agency,
      required this.subjectName,
      required this.cameraCount,
      required this.aiBoxCount,
      required this.installer,
      required this.demolCompany,
      required this.applyDate,
      required this.applyCompletionDate,
      required this.cancelApplicationDate,
      required this.cancelCompletionDate});

  @override
  List<Object> get props => [
        settleDate,
        region,
        agency,
        subjectName,
        cameraCount,
        aiBoxCount,
        installer,
        demolCompany,
        applyDate,
        applyCompletionDate,
        cancelApplicationDate,
        cancelCompletionDate
      ];
}
