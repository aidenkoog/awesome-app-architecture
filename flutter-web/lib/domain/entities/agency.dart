import 'package:equatable/equatable.dart';

class Agency extends Equatable {
  final String name;
  final String agency;
  final String date;
  final bool recordState;
  final String installState;

  const Agency({
    required this.name,
    required this.agency,
    required this.date,
    required this.recordState,
    required this.installState,
  });

  @override
  List<Object> get props => [name, agency, date, recordState, installState];
}
