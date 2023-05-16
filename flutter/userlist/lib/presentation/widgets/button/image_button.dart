// ignore_for_file: file_names
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'button.dart';

class ImageButton extends StatelessWidget {
  final dynamic image;
  final double width;
  final double height;
  final double borderRadius;
  final BoxDecoration decoration;
  final BoxFit? boxFit;
  final void Function()? onTap;

  const ImageButton(
      {super.key,
      required this.width,
      required this.height,
      this.image,
      this.decoration = const BoxDecoration(),
      this.boxFit,
      this.onTap,
      required this.borderRadius});

  @override
  Widget build(BuildContext context) {
    var isAssetImage = false;
    bool isNetworkImage = false;
    if (image != null) {
      isAssetImage = image.runtimeType.toString() == 'Image';
      isNetworkImage = image.toString().startsWith("http");
    } else {
      isAssetImage = true;
    }
    return Stack(children: [
      SizedBox(
          width: width,
          height: height,
          child: isAssetImage
              ? Image.asset('assets/images/user.png', width: 100, height: 100)
              : ClipRRect(
                  borderRadius: BorderRadius.circular(borderRadius),
                  child: isNetworkImage
                      ? CachedNetworkImage(
                          imageUrl: image,
                          fadeOutDuration: 300.milliseconds,
                          fit: BoxFit.cover,
                          errorWidget: (context, url, error) =>
                              const Icon(Icons.error))
                      : Image.asset('assets/images/user.png',
                          width: 100, height: 100))),
      if (onTap != null)
        Button(
            onTap: onTap,
            padding: 0,
            borderRadius: borderRadius,
            decoration: (decoration),
            child: SizedBox(width: width, height: height))
    ]);
  }
}
