import 'dart:async';
import 'package:get/get.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../controllers/image_api_controller.dart';
import '../../../utils/global_constants.dart';
import '../home/home_page.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({Key? key}) : super(key: key);

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  @override
  void initState() {
    super.initState();
    Timer(const Duration(seconds: 1), () {
      Get.off(
        () => const HomePage(),
        curve: Curves.easeInOut,
        duration: const Duration(seconds: 1),
        transition: Transition.fadeIn,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    ImageApiController.apiHelper.fetchData();

    return Scaffold(
      backgroundColor:
          (GlobalConstants.isDark) ? const Color(0xff1e1e1e) : Colors.white,
      body: Center(
        child: Stack(
          alignment: const Alignment(0, 1.05),
          children: [
            Image.asset('assets/images/splash_logo.png').animate().fadeIn(
                curve: Curves.easeInOut, duration: const Duration(seconds: 3)),
            Text(
              "AidenKooG Flutter App",
              style: GoogleFonts.arya(
                  fontSize: 35,
                  fontWeight: FontWeight.w600,
                  color:
                      (GlobalConstants.isDark) ? Colors.white : Colors.black),
            ).animate().fadeIn(
                curve: Curves.easeInOut, duration: const Duration(seconds: 3)),
          ],
        ),
      ),
    );
  }
}
