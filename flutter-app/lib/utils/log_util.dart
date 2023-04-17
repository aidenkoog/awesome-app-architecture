import 'package:m_log/m_log.dart';

// debug
void logd(String tagName, String logMessage) {
  MLog.d(tag: tagName, content: logMessage);
}

// error
void loge(String tagName, String logMessage) {
  MLog.e(tag: tagName, content: logMessage);
}

// information
void logi(String tagName, String logMessage) {
  MLog.i(tag: tagName, content: logMessage);
}

// verbose
void logv(String tagName, String logMessage) {
  MLog.v(tag: tagName, content: logMessage);
}

// window
void logw(String tagName, String logMessage) {
  MLog.w(tag: tagName, content: logMessage);
}
