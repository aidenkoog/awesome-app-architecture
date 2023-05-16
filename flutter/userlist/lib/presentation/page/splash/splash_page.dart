import 'package:flutter/material.dart';
import 'package:flutter_app_architecture/presentation/page/home/lobby_page.dart';
import 'package:get/get.dart';
import 'package:lottie/lottie.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(vsync: this);

    // under construction
    Future.delayed(const Duration(seconds: 3), () {
      Get.to(LobbyPage());
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        alignment: Alignment.center,
        child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(
                  width: 500,
                  height: 500,
                  child: Lottie.asset('assets/lottie/splash_lottie.json',
                      controller: _controller, onLoaded: (composition) {
                    _controller.addStatusListener((status) {
                      if (status == AnimationStatus.dismissed) {
                        _controller.forward();
                      } else if (status == AnimationStatus.completed) {
                        _controller.reverse();
                      }
                    });
                    _controller
                      ..duration = composition.duration
                      ..forward();
                  }))
            ]));
  }
}
