import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/temp/model.dart';

class NavigationItemButton extends StatelessWidget {
  final SampleModel model;
  final String title;
  final VoidCallback onTabCallack;
  const NavigationItemButton(
      {Key? key,
      required this.model,
      required this.title,
      required this.onTabCallack})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    final bool isMaxxSize = MediaQuery.of(context).size.width >= 1500;
    bool isHovering = false;

    return MediaQuery.of(context).size.width < 500
        ? const SizedBox(height: 0, width: 9)
        : model.isMobileResolution
            ? Container()
            : Container(
                alignment: Alignment.center,
                padding: EdgeInsets.only(top: 10, left: isMaxxSize ? 20 : 0),
                child: Container(
                    width: 115,
                    height: 32,
                    decoration:
                        BoxDecoration(border: Border.all(color: Colors.white)),
                    child: StatefulBuilder(
                        builder: (BuildContext context, StateSetter setState) {
                      return MouseRegion(
                        // button hover event.
                        onHover: (PointerHoverEvent event) {
                          isHovering = true;
                          setState(() {});
                        },
                        onExit: (PointerExitEvent event) {
                          isHovering = false;
                          setState(() {});
                        },

                        // button text.
                        child: InkWell(
                          hoverColor: Colors.white,
                          onTap: () {
                            onTabCallack();
                          },
                          child: Padding(
                            padding: const EdgeInsets.fromLTRB(8, 9, 8, 9),
                            child: Text(title,
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: isHovering
                                        ? model.paletteColor
                                        : Colors.white,
                                    fontSize: 12,
                                    fontWeight: isHovering
                                        ? FontWeight.bold
                                        : FontWeight.normal,
                                    fontFamily: 'Roboto-Medium')),
                          ),
                        ),
                      );
                    })));
  }
}
