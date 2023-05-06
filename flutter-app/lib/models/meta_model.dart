class MetaModel {
  final int totalCount;
  final int pageableCount;
  final bool isEnd;

  MetaModel(
      {required this.totalCount,
      required this.pageableCount,
      required this.isEnd});

  factory MetaModel.fromJson(Map<dynamic, dynamic> json) {
    return MetaModel(
        totalCount: json['total_count'],
        pageableCount: json['pageable_count'],
        isEnd: json['is_end']);
  }
}
