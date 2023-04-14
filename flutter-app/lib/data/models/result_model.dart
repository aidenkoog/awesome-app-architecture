// ignore: file_names
import '../../domain/entities/customer.dart';

class ResultModel extends Customer {
  const ResultModel({
    required String name,
    required String agency,
    required String date,
    required String recordState,
    required String installState,
  }) : super(
            name: '',
            agency: '',
            date: '',
            recordState: false,
            installState: '');

  factory ResultModel.fromJson(Map<String, dynamic> json) {
    return ResultModel(
      name: json['name'],
      agency: json['agency'],
      date: json['date'],
      recordState: json['recordState'],
      installState: json['installState'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'agency': agency,
      'date': date,
      'recordState': recordState,
      'installState': installState,
    };
  }
}
