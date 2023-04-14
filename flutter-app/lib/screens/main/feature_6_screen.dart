import 'package:flutter/material.dart';

class Feature6 extends StatelessWidget {
  final String routeName;

  const Feature6({
    Key? key,
    required this.routeName,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      Container(
          alignment: Alignment.topLeft,
          margin: const EdgeInsets.fromLTRB(100, 40, 0, 0),
          child: Row(
            children: const [],
          )),
      Expanded(
          flex: 1,
          child: Row(
            children: [
              Expanded(
                  flex: 4,
                  child: Container(
                    margin: const EdgeInsets.fromLTRB(100, 20, 20, 100),
                    padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        color: Colors.white.withOpacity(0.5),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: 10.0,
                            spreadRadius: 8,
                            offset: const Offset(
                              5.0,
                              5.0,
                            ),
                          ),
                        ]),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const SizedBox(
                          height: 100,
                        ),
                        Image.network(
                          'https://lh3.googleusercontent.com/rSQpAc0Z3nv8cIEub9qYcAbKUvUTelb3HdPhGaToFW6Mqwgap9oqHdXdMaWwYLx44A=s180-rw',
                          width: 250,
                          height: 175,
                        ),
                        const Text(
                          'Q&A',
                          style: TextStyle(
                              fontSize: 40,
                              fontWeight: FontWeight.w900,
                              color: Colors.purple),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(
                          height: 100,
                        ),
                        const Text(
                          'Dashboard Area',
                          style: TextStyle(
                              fontSize: 30, fontWeight: FontWeight.w700),
                          textAlign: TextAlign.center,
                        ),
                        InkWell(
                            onTap: () {},
                            child: Text(
                              'Filter + Search + Pagination + List',
                              style: TextStyle(
                                  fontSize: 18, color: Colors.green[900]),
                              textAlign: TextAlign.center,
                            )),
                      ],
                    ),
                  )),
              const SizedBox(
                width: 25,
              ),
              Expanded(
                  flex: 6,
                  child: Container(
                    margin: const EdgeInsets.fromLTRB(20, 20, 100, 100),
                    padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        color: Colors.white.withOpacity(0.5),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: 10.0,
                            spreadRadius: 8,
                            offset: const Offset(
                              5.0,
                              5.0,
                            ),
                          ),
                        ]),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const SizedBox(
                          height: 100,
                        ),
                        Image.network(
                          'https://lh3.googleusercontent.com/rSQpAc0Z3nv8cIEub9qYcAbKUvUTelb3HdPhGaToFW6Mqwgap9oqHdXdMaWwYLx44A=s180-rw',
                          width: 250,
                          height: 175,
                        ),
                        const Text(
                          'Q&A',
                          style: TextStyle(
                              fontSize: 40,
                              fontWeight: FontWeight.w900,
                              color: Colors.purple),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(
                          height: 100,
                        ),
                        const Text(
                          'Information Settings Area',
                          style: TextStyle(
                              fontSize: 30, fontWeight: FontWeight.w700),
                          textAlign: TextAlign.center,
                        ),
                        InkWell(
                            onTap: () {},
                            child: Text(
                              'Register / Modify / ETC',
                              style: TextStyle(
                                  fontSize: 18, color: Colors.green[900]),
                              textAlign: TextAlign.center,
                            )),
                      ],
                    ),
                  )),
            ],
          ))
    ]);
  }
}