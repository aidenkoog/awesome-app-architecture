import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/assets/strings/strings.dart';
import 'package:flutter_web_navigation/presentation/theme/theme_model.dart';
import 'package:url_launcher/url_launcher.dart';

class Footer extends StatelessWidget {
  final ThemeModel model;
  const Footer({Key? key, required this.model}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        height: 60,
        decoration: BoxDecoration(
            border:
                Border(top: BorderSide(width: 0.8, color: model.dividerColor)),
            color: model.themeData.colorScheme.brightness == Brightness.dark
                ? const Color.fromRGBO(33, 33, 33, 1)
                : const Color.fromRGBO(234, 234, 234, 1)),
        padding: model.isMobileResolution
            ? EdgeInsets.fromLTRB(MediaQuery.of(context).size.width * 0.025, 0,
                MediaQuery.of(context).size.width * 0.025, 0)
            : EdgeInsets.fromLTRB(MediaQuery.of(context).size.width * 0.05, 0,
                MediaQuery.of(context).size.width * 0.05, 0),
        child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Row(children: <Widget>[
                      InkWell(
                          onTap: () => launchUrl(Uri.parse(homepageLink)),
                          child: const Text(homepageTitle,
                              style:
                                  TextStyle(color: Colors.blue, fontSize: 12))),
                      Text(' | ',
                          style: TextStyle(
                              fontSize: 12,
                              color: model.textColor.withOpacity(0.7))),
                      InkWell(
                          onTap: () => launchUrl(Uri.parse(githubLink)),
                          child: const Text(githubTitle,
                              style:
                                  TextStyle(color: Colors.blue, fontSize: 12))),
                    ]),
                    Container(
                        padding: const EdgeInsets.only(top: 10),
                        child: Text(copyrightText,
                            style: TextStyle(
                                color: model.textColor.withOpacity(0.7),
                                fontSize: 12,
                                letterSpacing: 0.23)))
                  ]),
              InkWell(
                  onTap: () => launchUrl(Uri.parse(homepageLink)),
                  child: Text(myAccountName,
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 17,
                          color: model.themeData.colorScheme.brightness ==
                                  Brightness.dark
                              ? Colors.white
                              : Colors.black))),
            ]));
  }
}
