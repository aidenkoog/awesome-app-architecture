import 'package:flutter/material.dart';

import '../../../../assets/strings/strings.dart';

class SearchInputBar extends StatefulWidget {
  final double cardWidth;
  const SearchInputBar({Key? key, required this.cardWidth}) : super(key: key);

  @override
  State<SearchInputBar> createState() => _SearchInputBarState();
}

class _SearchInputBarState extends State<SearchInputBar> {
  @override
  Widget build(BuildContext context) {
    return Container(
        width: widget.cardWidth - 50,
        margin: const EdgeInsets.only(top: 6),
        child: TextField(
            keyboardType: TextInputType.text,
            onChanged: (value) {},
            decoration: const InputDecoration(
                hintText: searchBoxHintText,
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(5)),
                    borderSide: BorderSide(style: BorderStyle.solid)),
                suffixIcon: Padding(
                    padding: EdgeInsets.only(right: 15),
                    child: Icon(Icons.search)))));
  }
}
