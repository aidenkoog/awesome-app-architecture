import 'dart:core';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'package:intl/intl.dart';
import 'package:syncfusion_flutter_core/theme.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';
import 'package:syncfusion_flutter_datagrid_export/export.dart';
import 'package:syncfusion_flutter_pdf/pdf.dart';
import 'package:syncfusion_flutter_xlsio/xlsio.dart' hide Column, Row, Border;

import 'datagridsource/orderinfo_datagridsource.dart';
import 'model/sample_view.dart';

import '../datagrid/common/export/save_file_mobile.dart'
    if (dart.library.html) '../datagrid/common/export/save_file_web.dart'
    as helper;

class PagingDataGrid extends SampleView {
  final double cardWidth;
  final bool isSoloCard;

  const PagingDataGrid(
      {Key? key, required this.cardWidth, required this.isSoloCard})
      : super(key: key);

  @override
  _PagingDataGridState createState() => _PagingDataGridState();
}

class _PagingDataGridState extends SampleViewState {
  final GlobalKey<SfDataGridState> _key = GlobalKey<SfDataGridState>();
  static const double dataPagerHeight = 60;

  bool isLandscapeInMobileView = false;
  int _rowsPerPage = 10;

  late OrderInfoDataGridSource orderInfoDataSource;
  late bool isWebOrDesktop;

  @override
  void initState() {
    super.initState();
    isWebOrDesktop = model.isWeb || model.isDesktop;
    orderInfoDataSource =
        OrderInfoDataGridSource(isWebOrDesktop: true, orderDataCount: 300);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    isLandscapeInMobileView = !isWebOrDesktop &&
        MediaQuery.of(context).orientation == Orientation.landscape;
  }

  Widget _buildDataGrid() {
    return SfDataGrid(
        source: orderInfoDataSource,
        rowsPerPage: _rowsPerPage,
        allowSorting: true,
        allowTriStateSorting: true,
        columnWidthMode: (isWebOrDesktop && !model.isMobileResolution) ||
                isLandscapeInMobileView
            ? ColumnWidthMode.fill
            : ColumnWidthMode.fill,
        columns: <GridColumn>[
          GridColumn(
              width: (isWebOrDesktop &&
                      model.isMobileResolution &&
                      !(widget as PagingDataGrid).isSoloCard)
                  ? 80.0
                  : double.nan,
              columnName: 'id',
              label: Container(
                  padding: const EdgeInsets.all(8),
                  alignment: Alignment.center,
                  child: Text('ID',
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: model.paletteColor)))),
          GridColumn(
              width: (isWebOrDesktop &&
                      model.isMobileResolution &&
                      !(widget as PagingDataGrid).isSoloCard)
                  ? 150.0
                  : double.nan,
              columnWidthMode: (isWebOrDesktop && model.isMobileResolution)
                  ? ColumnWidthMode.none
                  : ColumnWidthMode.fitByColumnName,
              autoFitPadding: const EdgeInsets.all(8),
              columnName: 'customerId',
              label: Container(
                  padding: const EdgeInsets.all(8),
                  alignment: Alignment.center,
                  child: Text('ID2',
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: model.paletteColor)))),
          GridColumn(
              width: (isWebOrDesktop &&
                      model.isMobileResolution &&
                      !(widget as PagingDataGrid).isSoloCard)
                  ? 120.0
                  : double.nan,
              columnName: 'name',
              label: Container(
                  padding: const EdgeInsets.all(8),
                  alignment: Alignment.center,
                  child: Text('Name',
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: model.paletteColor)))),
          GridColumn(
              width: (isWebOrDesktop &&
                      model.isMobileResolution &&
                      !(widget as PagingDataGrid).isSoloCard)
                  ? 110.0
                  : double.nan,
              columnName: 'freight',
              label: Container(
                  padding: const EdgeInsets.all(8),
                  alignment: Alignment.center,
                  child: Text('Price1',
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: model.paletteColor)))),
          GridColumn(
            width: (isWebOrDesktop &&
                    model.isMobileResolution &&
                    !(widget as PagingDataGrid).isSoloCard)
                ? 120.0
                : double.nan,
            columnName: 'city',
            label: Container(
              padding: const EdgeInsets.all(8),
              alignment: Alignment.center,
              child: Text('City',
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                      fontWeight: FontWeight.bold, color: model.paletteColor)),
            ),
          ),
          GridColumn(
              width: (isWebOrDesktop &&
                      model.isMobileResolution &&
                      !(widget as PagingDataGrid).isSoloCard)
                  ? 120.0
                  : double.nan,
              columnName: 'price',
              label: Container(
                  padding: const EdgeInsets.all(8),
                  alignment: Alignment.center,
                  child: Text('Price2',
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: model.paletteColor))))
        ]);
  }

  Widget _buildDataPager() {
    return SfDataPagerTheme(
        data: SfDataPagerThemeData(
            brightness: model.themeData.colorScheme.brightness,
            selectedItemColor: model.backgroundColor),
        child: SfDataPager(
            delegate: orderInfoDataSource,
            availableRowsPerPage: const <int>[10, 15, 20],
            pageCount: orderInfoDataSource.orders.length / _rowsPerPage,
            onRowsPerPageChanged: (int? rowsPerPage) {
              setState(() => _rowsPerPage = rowsPerPage!);
            }));
  }

  Widget _buildLayoutBuilder() {
    PagingDataGrid pagingDataGridWidget = widget as PagingDataGrid;
    return LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraint) {
      return Column(children: <Widget>[
        SizedBox(
            width: pagingDataGridWidget.cardWidth * 0.935,
            height: pagingDataGridWidget.isSoloCard
                ? pagingDataGridWidget.cardWidth * 0.4
                : pagingDataGridWidget.cardWidth * 0.72,
            child: _buildDataGrid()),
        Container(
            height: dataPagerHeight,
            decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surface.withOpacity(0.12),
                border: Border(
                    top: BorderSide(
                        width: .5,
                        color: Theme.of(context)
                            .colorScheme
                            .onSurface
                            .withOpacity(0.12)))),
            child: Align(child: _buildDataPager()))
      ]);
    });
  }

  @override
  Widget build(BuildContext context) {
    return _buildLayoutBuilder();
  }

  Widget _buildExportingButtons() {
    Future<void> exportDataGridToExcel() async {
      final Workbook workbook = _key.currentState!.exportToExcelWorkbook(
          cellExport: (DataGridCellExcelExportDetails details) {
        if (details.cellType == DataGridExportCellType.columnHeader) {
          final bool isRightAlign = details.columnName == 'Product No' ||
              details.columnName == 'Shipped Date' ||
              details.columnName == 'Price';
          details.excelRange.cellStyle.hAlign =
              isRightAlign ? HAlignType.right : HAlignType.left;
        }
      });
      final List<int> bytes = workbook.saveAsStream();
      workbook.dispose();
      await helper.FileSaveHelper.saveAndLaunchFile(bytes, 'DataGrid.xlsx');
    }

    Future<void> exportDataGridToPdf() async {
      final ByteData data = await rootBundle.load('images/syncfusion_logo.jpg');
      final PdfDocument document = _key.currentState!.exportToPdfDocument(
          fitAllColumnsInOnePage: true,
          cellExport: (DataGridCellPdfExportDetails details) {
            if (details.cellType == DataGridExportCellType.row) {
              if (details.columnName == 'Shipped Date') {
                details.pdfCell.value = DateFormat('MM/dd/yyyy')
                    .format(DateTime.parse(details.pdfCell.value));
              }
            }
          },
          headerFooterExport: (DataGridPdfHeaderFooterExportDetails details) {
            final double width = details.pdfPage.getClientSize().width;
            final PdfPageTemplateElement header =
                PdfPageTemplateElement(Rect.fromLTWH(0, 0, width, 65));

            header.graphics.drawImage(
                PdfBitmap(data.buffer
                    .asUint8List(data.offsetInBytes, data.lengthInBytes)),
                Rect.fromLTWH(width - 148, 0, 148, 60));

            header.graphics.drawString(
              'Product Details',
              PdfStandardFont(PdfFontFamily.helvetica, 13,
                  style: PdfFontStyle.bold),
              bounds: const Rect.fromLTWH(0, 25, 200, 60),
            );

            details.pdfDocumentTemplate.top = header;
          });
      final List<int> bytes = document.saveSync();
      await helper.FileSaveHelper.saveAndLaunchFile(bytes, 'DataGrid.pdf');
      document.dispose();
    }

    return Row(
      children: <Widget>[
        _buildExportingButton('Export to Excel', 'images/ExcelExport.png',
            onPressed: exportDataGridToExcel),
        _buildExportingButton('Export to PDF', 'images/PdfExport.png',
            onPressed: exportDataGridToPdf)
      ],
    );
  }

  Widget _buildExportingButton(String buttonName, String imagePath,
      {required VoidCallback onPressed}) {
    return Container(
      height: 60.0,
      padding: const EdgeInsets.only(left: 10.0, top: 10.0, bottom: 10.0),
      child: MaterialButton(
        onPressed: onPressed,
        color: model.backgroundColor,
        child: SizedBox(
          width: 150.0,
          height: 40.0,
          child: Row(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(left: 8.0, right: 8.0),
                child: ImageIcon(
                  AssetImage(imagePath),
                  size: 30,
                  color: Colors.white,
                ),
              ),
              Text(buttonName, style: const TextStyle(color: Colors.white)),
            ],
          ),
        ),
      ),
    );
  }
}
