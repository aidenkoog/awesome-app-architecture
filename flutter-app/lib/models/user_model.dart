import 'package:equatable/equatable.dart';

class UserModel extends Equatable {
  final int userId;
  final int id;
  final String title;
  final String body;

  const UserModel(
      {required this.userId,
      required this.id,
      required this.title,
      required this.body});

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
        userId: json['userId'],
        id: json['id'],
        title: json['title'],
        body: json['body']);
  }
  Map<String, dynamic> toJson() => <String, dynamic>{
        'userId': userId,
        'id': id,
        'title': title,
        'body': body
      };

  @override
  String toString() {
    return "userId $userId id $id";
  }

  @override
  List<Object?> get props => [userId, id, title, body];
}
