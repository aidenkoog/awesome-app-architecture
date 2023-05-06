class FavoriteModel {
  int? id;
  String? image;

  FavoriteModel({
    this.id,
    required this.image,
  });

  factory FavoriteModel.fromMap({required Map<String, dynamic> data}) {
    return FavoriteModel(
      id: data['id'],
      image: data['image'],
    );
  }
}
