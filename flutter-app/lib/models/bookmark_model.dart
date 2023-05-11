class BookmarkModel {
  int? id;
  String? title;

  BookmarkModel({this.id, required this.title});

  factory BookmarkModel.fromMap({required Map<String, dynamic> data}) {
    return BookmarkModel(id: data['id'], title: data['title']);
  }
}
