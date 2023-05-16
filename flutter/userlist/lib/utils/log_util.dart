// ignore_for_file: avoid_print
void logd(String tagName, String logMessage) =>
    print('[debug] $tagName: $logMessage');

void loge(String tagName, String logMessage) =>
    print('[error] $tagName: $logMessage');

void logi(String tagName, String logMessage) =>
    print('[info] $tagName: $logMessage');

void logv(String tagName, String logMessage) =>
    print('[verbose] $tagName: $logMessage');

void logw(String tagName, String logMessage) =>
    print('[warning] $tagName: $logMessage');
