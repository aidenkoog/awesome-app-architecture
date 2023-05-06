class ImageModel {
  final String collection;
  final String thumbnailUrl;
  final String imageUrl;
  final int width;
  final int height;
  final String displaySiteName;
  final String docUrl;
  final String datetime;

  ImageModel(
      {required this.collection,
      required this.thumbnailUrl,
      required this.imageUrl,
      required this.width,
      required this.height,
      required this.displaySiteName,
      required this.docUrl,
      required this.datetime});

  factory ImageModel.fromJson(Map<String, dynamic> json) {
    return ImageModel(
        collection: json['collection'],
        thumbnailUrl: json['thumbnail_url'],
        imageUrl: json['image_url'],
        width: json['width'],
        height: json['height'],
        displaySiteName: json['display_sitename'],
        docUrl: json['doc_url'],
        datetime: json['datetime']);
  }
}
