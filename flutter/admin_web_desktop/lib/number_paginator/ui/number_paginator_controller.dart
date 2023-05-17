import 'package:flutter/material.dart';

class NumberPaginatorController extends ChangeNotifier {
  int _currentPage = 0;
  int get currentPage => _currentPage;

  set currentPage(int value) {
    _currentPage = value;
    notifyListeners();
  }

  prev() {
    _currentPage--;
    notifyListeners();
  }

  next() {
    _currentPage++;
    notifyListeners();
  }

  navigateToPage(int index) {
    currentPage = index;
  }
}
