import 'package:equatable/equatable.dart';

class Qna extends Equatable {
  final String agency;
  final String company;
  final String content;
  final String date;
  final bool answerState;

  const Qna({
    required this.agency,
    required this.company,
    required this.content,
    required this.date,
    required this.answerState,
  });

  @override
  List<Object> get props => [agency, company, content, date, answerState];
}
