import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:skeleton_text/skeleton_text.dart';
import 'package:get/get.dart';
import '../../../controllers/image_api_controller.dart';
import '../../../models/image_model.dart';
import '../../../utils/global_constants.dart';
import '../detail/detail_page.dart';
import '../favorite/favorite_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int currentIndex = 0;
  IconData home = Icons.home;
  IconData fav = Icons.favorite_border;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        extendBodyBehindAppBar: true,
        body: FutureBuilder(
          future: ImageApiController.apiHelper.fetchData(),
          builder: (context, snapshot) {
            if (snapshot.hasError) {
              return Container();
              // return Center(
              //   child: Text(
              //     "Image not found",
              //     style: GoogleFonts.arya(
              //       fontSize: 25,
              //       fontWeight: FontWeight.w600,
              //       color: (GlobalConstants.isDark) ? Colors.white : Colors.black,
              //     ),
              //   ),
              // );
            }
            ImageModel? data = snapshot.data;
            //if (data != null) {
            return CustomScrollView(
              slivers: [
                SliverAppBar(
                  expandedHeight: 160,
                  toolbarHeight: 80,
                  automaticallyImplyLeading: false,
                  pinned: true,
                  backgroundColor: Colors.transparent,
                  flexibleSpace: Container(
                    decoration: BoxDecoration(
                      borderRadius: const BorderRadius.vertical(
                          bottom: Radius.circular(25)),
                      color: (GlobalConstants.isDark)
                          ? const Color(0xff1e1e1e)
                          : Colors.blue.shade50,
                    ),
                    child: FlexibleSpaceBar(
                      expandedTitleScale: 1,
                      background: Align(
                        alignment: const Alignment(0, -0.4),
                        child: Text(
                          "Albums",
                          style: GoogleFonts.arya(
                              fontSize: 25,
                              fontWeight: FontWeight.w600,
                              color: GlobalConstants.isDark
                                  ? Colors.white
                                  : Colors.black),
                        ),
                      ),
                      title: Row(
                        children: [
                          Expanded(
                            flex: 11,
                            child: SizedBox(
                              height: 50,
                              width: 200,
                              child: TextField(
                                onSubmitted: (val) {
                                  setState(() {
                                    GlobalConstants.imageTitle = val;
                                  });
                                },
                                style: GoogleFonts.arya(
                                  color: GlobalConstants.isDark
                                      ? Colors.white
                                      : Colors.black,
                                  fontSize: 16,
                                ),
                                cursorColor: GlobalConstants.isDark
                                    ? Colors.white
                                    : Colors.black,
                                decoration: InputDecoration(
                                  enabledBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(40),
                                      borderSide: BorderSide(
                                          color: (GlobalConstants.isDark)
                                              ? Colors.grey.shade300
                                              : Colors.black54)),
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(40),
                                    borderSide: BorderSide(
                                      color: (GlobalConstants.isDark)
                                          ? Colors.grey.shade300
                                          : Colors.black54,
                                    ),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(40),
                                      borderSide: BorderSide(
                                          color: (GlobalConstants.isDark)
                                              ? Colors.grey.shade300
                                              : Colors.black54)),
                                  hintText: 'Search...',
                                  hintStyle: GoogleFonts.arya(
                                    color: GlobalConstants.isDark
                                        ? Colors.white
                                        : Colors.black,
                                    fontSize: 15,
                                  ),
                                  prefixIcon: Icon(
                                    Icons.search,
                                    size: 20,
                                    color: GlobalConstants.isDark
                                        ? Colors.white
                                        : Colors.black,
                                  ),
                                ),
                              ),
                            ),
                          ),
                          Expanded(
                            flex: 2,
                            child: GestureDetector(
                              onTap: () {
                                setState(() {
                                  GlobalConstants.isDark =
                                      !GlobalConstants.isDark;
                                });
                              },
                              child: Icon(
                                Icons.light_mode_outlined,
                                color: GlobalConstants.isDark
                                    ? Colors.white
                                    : Colors.black,
                              ),
                            ),
                          ),
                        ],
                      ),
                      titlePadding: const EdgeInsets.only(left: 10, bottom: 20),
                    ),
                  ),
                ),
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.only(left: 8, right: 8),
                    child: Column(
                      children: [
                        const SizedBox(height: 10),
                        Padding(
                          padding: const EdgeInsets.only(left: 8),
                          child: Align(
                            alignment: Alignment.centerLeft,
                            child: Text(
                              "${GlobalConstants.imageTitle} Images",
                              style: GoogleFonts.arya(
                                fontSize: 25,
                                fontWeight: FontWeight.w600,
                                color: GlobalConstants.isDark
                                    ? Colors.white
                                    : Colors.black,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 15),
                        data != null
                            ? Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceAround,
                                children: [
                                  myContainer(image1: data.imageUrl),
                                ],
                              )
                            : Container(),
                        const SizedBox(height: 15),
                        // LoadingAnimationWidget.discreteCircle(
                        //     color: GlobalConstants.isDark ? Colors.white : Colors.black,
                        //     size: 30),
                        // const SizedBox(height: 20),
                      ],
                    ),
                  ),
                ),
              ],
            );
            //}
            // return Center(
            //   child: LoadingAnimationWidget.discreteCircle(
            //     color: (GlobalConstants.isDark) ? Colors.white : Colors.black,
            //     size: 40,
            //   ),
            // );
          },
        ),
        backgroundColor: (GlobalConstants.isDark == true)
            ? const Color(0xff2a2a2a)
            : Colors.white,
        bottomNavigationBar: BottomNavigationBar(
          backgroundColor: (GlobalConstants.isDark)
              ? const Color(0xff1e1e1e)
              : Colors.blue.shade50,
          onTap: (val) {
            setState(() {
              currentIndex = val;
              if (currentIndex == 0) {
                home = Icons.home;
                fav = Icons.favorite_border;
              } else if (currentIndex == 1) {
                home = Icons.home_outlined;
                fav = Icons.favorite;
                Get.to(
                  () => const FavoritePage(),
                  duration: const Duration(seconds: 2),
                  transition: Transition.fadeIn,
                  curve: Curves.easeInOut,
                );
              }
            });
          },
          selectedItemColor:
              GlobalConstants.isDark ? Colors.white : Colors.black,
          unselectedItemColor:
              GlobalConstants.isDark ? Colors.white30 : Colors.black45,
          items: [
            BottomNavigationBarItem(icon: Icon(home, size: 30), label: "Home"),
            BottomNavigationBarItem(
                icon: Icon(fav, size: 30), label: "Favorite"),
          ],
          currentIndex: 0,
        ),
      ),
    );
  }

  Widget myContainer({required String image1}) {
    return GestureDetector(
      onTap: () {
        Get.to(
          () => const DetailPage(),
          transition: Transition.fadeIn,
          duration: const Duration(milliseconds: 500),
          curve: Curves.easeInOut,
          arguments: image1,
        );
      },
      child: Container(
        height: 300,
        width: MediaQuery.of(context).size.width / 2.3,
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              blurRadius: 3,
              spreadRadius: 1,
              color: GlobalConstants.isDark
                  ? Colors.white54
                  : Colors.grey.shade400,
            ),
          ],
          color: Colors.grey.shade200,
          borderRadius: BorderRadius.circular(20),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(20),
          child: Image.network(
            image1,
            filterQuality: FilterQuality.high,
            fit: BoxFit.fitHeight,
            loadingBuilder: (context, child, image) {
              if (image == null) return child;
              return SkeletonAnimation(
                shimmerColor: GlobalConstants.isDark
                    ? Colors.black12
                    : Colors.grey.shade200,
                curve: Curves.easeInOut,
                child: Container(
                  height: 300,
                  width: MediaQuery.of(context).size.width / 2.15,
                  color: GlobalConstants.isDark
                      ? Colors.black45
                      : Colors.grey.shade50,
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
