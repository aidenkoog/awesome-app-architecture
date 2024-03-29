import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

import '../../../theme/theme_model.dart';
import '../model/orderinfo.dart';

class OrderInfoDataGridSource extends DataGridSource {
  OrderInfoDataGridSource(
      {this.model,
      required this.isWebOrDesktop,
      this.orderDataCount,
      this.ordersCollection,
      this.culture,
      bool? isFilteringSample}) {
    this.isFilteringSample = isFilteringSample ?? false;
    orders = ordersCollection ??
        getOrders(orders, orderDataCount ?? 100, culture: culture ?? '');
    currencySymbol = getCurrencySymbol();
    buildDataGridRows();
  }

  final bool isWebOrDesktop;
  final ThemeModel? model;

  String? culture;
  int? orderDataCount;

  final math.Random _random = math.Random();

  List<OrderInfo> orders = <OrderInfo>[];
  List<OrderInfo>? ordersCollection;
  List<DataGridRow> dataGridRows = <DataGridRow>[];

  String currencySymbol = '';
  late bool isFilteringSample;

  void buildDataGridRows() {
    dataGridRows = isWebOrDesktop
        ? orders.map<DataGridRow>((OrderInfo order) {
            return DataGridRow(cells: <DataGridCell>[
              DataGridCell<int>(
                  columnName: getColumnName('id'), value: order.id),
              DataGridCell<int>(
                  columnName: getColumnName('customerId'),
                  value: order.customerId),
              DataGridCell<String>(
                  columnName: getColumnName('name'), value: order.name),
              DataGridCell<double>(
                  columnName: getColumnName('freight'), value: order.freight),
              DataGridCell<String>(
                  columnName: getColumnName('city'), value: order.city),
              DataGridCell<double>(
                  columnName: getColumnName('price'), value: order.price)
            ]);
          }).toList()
        : orders.map<DataGridRow>((OrderInfo order) {
            return DataGridRow(cells: <DataGridCell>[
              DataGridCell<int>(
                  columnName: getColumnName('id'), value: order.id),
              DataGridCell<int>(
                  columnName: getColumnName('customerId'),
                  value: order.customerId),
              DataGridCell<String>(
                  columnName: getColumnName('name'), value: order.name),
              DataGridCell<String>(
                  columnName: getColumnName('city'), value: order.city)
            ]);
          }).toList();
  }

  @override
  List<DataGridRow> get rows => dataGridRows;

  @override
  DataGridRowAdapter buildRow(DataGridRow row) {
    final int rowIndex = dataGridRows.indexOf(row);
    Color backgroundColor = Colors.transparent;
    if (model != null && (rowIndex % 2) == 0 && culture == null) {
      backgroundColor = model!.backgroundColor.withOpacity(0.07);
    }
    if (isWebOrDesktop) {
      return DataGridRowAdapter(color: backgroundColor, cells: <Widget>[
        Container(
            padding: const EdgeInsets.all(8),
            alignment: Alignment.center,
            child: Text(row.getCells()[0].value.toString(),
                overflow: TextOverflow.ellipsis)),
        Container(
            padding: const EdgeInsets.all(8),
            alignment: Alignment.center,
            child: Text(row.getCells()[1].value.toString(),
                overflow: TextOverflow.ellipsis)),
        Container(
            padding: const EdgeInsets.all(8),
            alignment: Alignment.center,
            child: Text(row.getCells()[2].value.toString())),
        Container(
            padding: const EdgeInsets.all(8),
            alignment: Alignment.center,
            child: Text(
                NumberFormat.currency(locale: 'en_US', symbol: currencySymbol)
                    .format(row.getCells()[3].value))),
        Container(
            padding: const EdgeInsets.all(8),
            alignment: Alignment.center,
            child: Text(row.getCells()[4].value.toString(),
                overflow: TextOverflow.ellipsis)),
        Container(
            padding: const EdgeInsets.all(8),
            alignment: Alignment.center,
            child: Text(NumberFormat.currency(
                    locale: 'en_US', symbol: currencySymbol, decimalDigits: 0)
                .format(row.getCells()[5].value)))
      ]);
    } else {
      Widget buildWidget({
        AlignmentGeometry alignment = Alignment.centerLeft,
        EdgeInsetsGeometry padding = const EdgeInsets.all(8.0),
        TextOverflow textOverflow = TextOverflow.ellipsis,
        required Object value,
      }) {
        return Container(
            padding: padding,
            alignment: alignment,
            child: Text(value.toString(), overflow: textOverflow));
      }

      return DataGridRowAdapter(
          color: backgroundColor,
          cells: row.getCells().map<Widget>((DataGridCell dataCell) {
            if (dataCell.columnName == getColumnName('id') ||
                dataCell.columnName == getColumnName('customerId')) {
              return buildWidget(
                  alignment: Alignment.centerRight, value: dataCell.value!);
            } else {
              return buildWidget(value: dataCell.value!);
            }
          }).toList(growable: false));
    }
  }

  /// Currency symbol
  String getCurrencySymbol() {
    if (culture != null) {
      final format = NumberFormat.compactSimpleCurrency(locale: 'en_US');
      return format.currencySymbol;
    } else {
      final format = NumberFormat.simpleCurrency();
      return format.currencySymbol;
    }
  }

  @override
  Future<void> handleLoadMoreRows() async {
    await Future<void>.delayed(const Duration(seconds: 5));
    orders = getOrders(orders, 15);
    buildDataGridRows();
    notifyListeners();
  }

  @override
  Future<void> handleRefresh() async {
    await Future<void>.delayed(const Duration(seconds: 5));
    orders = getOrders(orders, 15);
    buildDataGridRows();
    notifyListeners();
  }

  @override
  Widget? buildTableSummaryCellWidget(
      GridTableSummaryRow summaryRow,
      GridSummaryColumn? summaryColumn,
      RowColumnIndex rowColumnIndex,
      String summaryValue) {
    Widget? widget;
    Widget buildCell(String value, EdgeInsets padding, Alignment alignment) {
      return Container(
        padding: padding,
        alignment: alignment,
        child: Text(value,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(fontWeight: FontWeight.w500)),
      );
    }

    if (summaryRow.showSummaryInRow) {
      widget = buildCell(
          summaryValue, const EdgeInsets.all(16.0), Alignment.centerLeft);
    } else if (summaryValue.isNotEmpty) {
      if (summaryColumn!.columnName == 'freight') {
        summaryValue = double.parse(summaryValue).toStringAsFixed(2);
      }

      summaryValue = 'Sum: ' +
          NumberFormat.currency(locale: 'en_US', decimalDigits: 0, symbol: r'$')
              .format(double.parse(summaryValue));

      widget = buildCell(
          summaryValue, const EdgeInsets.all(8.0), Alignment.centerRight);
    }
    return widget;
  }

  /// Provides the column name.
  String getColumnName(String columnName) {
    if (isFilteringSample) {
      switch (columnName) {
        case 'id':
          return 'Order ID';
        case 'customerId':
          return 'Customer ID';
        case 'name':
          return 'Name';
        case 'freight':
          return 'Freight';
        case 'city':
          return 'City';
        case 'price':
          return 'Price';
        default:
          return columnName;
      }
    }
    return columnName;
  }

  /// Update DataSource
  void updateDataSource() {
    notifyListeners();
  }

  //  Order Data's
  final List<String> _names = <String>[
    'Crowley',
    'Blonp',
    'Folko',
    'Irvine',
    'Folig',
    'Picco',
    'Frans',
    'Warth',
    'Linod',
    'Simop',
    'Merep',
    'Riscu',
    'Seves',
    'Vaffe',
    'Alfki',
  ];

  final List<String> _frenchNames = <String>[
    'Crowley',
    'Blonp',
    'Folko',
    'Irvine',
    'Folig',
    'Pico',
    'François',
    'Warth',
    'Linod',
    'Simop',
    'Merep',
    'Riscu',
    'Sèves',
    'Vaffé',
    'Alfki',
  ];

  final List<String> _spanishNames = <String>[
    'Crowley',
    'Blonp',
    'Folko',
    'Irvine',
    'Folig',
    'Cima',
    'francés',
    'Warth',
    'lindod',
    'Simop',
    'Merep',
    'Riesgo',
    'Suyas',
    'Gofre',
    'Alfki',
  ];

  final List<String> _chineseNames = <String>[
    '克勞利',
    '布隆普',
    '民間',
    '爾灣',
    '佛利格',
    '頂峰',
    '法語',
    '沃思',
    '林諾德',
    '辛普',
    '梅雷普',
    '風險',
    '塞維斯',
    '胡扯',
    '阿里基',
  ];

  final List<String> _arabicNames = <String>[
    'كراولي',
    'بلونب',
    'فولكو',
    'ايرفين',
    'فوليج',
    'بيكو',
    'فرانس',
    'وارث',
    'لينود',
    'سيموب',
    'مرحى',
    'ريسكو',
    'السباعيات',
    'فافي',
    'الفكي',
  ];

  final List<String> _cities = <String>[
    'Bruxelles',
    'Rosario',
    'Recife',
    'Graz',
    'Montreal',
    'Tsawassen',
    'Campinas',
    'Resende',
  ];

  final List<String> _chineseCties = <String>[
    '布魯塞爾',
    '羅薩里奧',
    '累西腓',
    '格拉茨',
    '蒙特利爾',
    '薩瓦森',
    '坎皮納斯',
    '重新發送',
  ];

  final List<String> _frenchCties = <String>[
    'Bruxelles',
    'Rosario',
    'Récife',
    'Graz',
    'Montréal',
    'Tsawassen',
    'Campinas',
    'Renvoyez',
  ];

  final List<String> _spanishCties = <String>[
    'Bruselas',
    'Rosario',
    'Recife',
    'Graz',
    'Montréal',
    'Tsawassen',
    'Campiñas',
    'Reenviar',
  ];

  final List<String> _arabicCties = <String>[
    ' بروكسل',
    'روزاريو',
    'ريسيفي',
    'غراتس',
    'مونتريال',
    'تساواسن',
    'كامبيناس',
    'ريسيندي',
  ];

  /// Get orders collection
  List<OrderInfo> getOrders(List<OrderInfo> orderData, int count,
      {String? culture}) {
    final int startIndex = orderData.isNotEmpty ? orderData.length : 0,
        endIndex = startIndex + count;
    List<String> city;
    List<String> names;

    if (culture == 'Chinese') {
      city = _chineseCties;
      names = _chineseNames;
    } else if (culture == 'Arabic') {
      city = _arabicCties;
      names = _arabicNames;
    } else if (culture == 'French') {
      city = _frenchCties;
      names = _frenchNames;
    } else if (culture == 'Spanish') {
      city = _spanishCties;
      names = _spanishNames;
    } else {
      city = _cities;
      names = _names;
    }

    for (int i = startIndex; i < endIndex; i++) {
      orderData.add(OrderInfo(
        1000 + i,
        1700 + i,
        names[i < names.length ? i : _random.nextInt(names.length - 1)],
        _random.nextInt(1000) + _random.nextDouble(),
        city[_random.nextInt(city.length - 1)],
        1500.0 + _random.nextInt(100),
      ));
    }
    return orderData;
  }
}
