export default {
    SCREEN: {
        ROOT: "Root",
        SPLASH: "Splash",
        PROFILE: "Profile",
        QR_SCAN: "QrScan",
        BLUETOOTH: "Bluetooth",
        HOME: "Home",
        HIDDEN: {
            SPLASH: "HiddenSplash",
            HOME: "HiddenHome",
            BLUETOOTH: "Bluetooth",
            COMMON: "Common",
            PLATFORM: "Platform",
            SERVER: "Server"
        }
    },
    ROOT: {
        APP_EVENT_TYPE: 'change',
        APP_ACTIVE: 'active',
        APP_BACKGROUND: 'background',
    },
    COMMON: {
        DEFAULT_DATA: '',
        DEFAULT_STATE: false,
        DEFAULT_LIST_STATE: [],
    },
    BT: {
        SCAN_DURATION: 3
    },
    LOG: {
        // ble manager log.
        BT_BLE_MANAGER: 'BT_BLE_MANAGER',

        // repository log.
        BT_REPO_LOG: 'BT_REPO_LOG',
        COMMON_REPO_LOG: 'COMMON_REPO_LOG',
        PLATFORM_REPO_LOG: 'PLATFORM_REPO_LOG',
        SERVER_REPO_LOG: 'SERVER_REPO_LOG',

        // usecase log.
        BT_USECASE_LOG: 'BT_USECASE_LOG',
        COMMON_USECASE_LOG: 'COMMON_USECASE_LOG',
        PLATFORM_USECASE_LOG: 'PLATFORM_USECASE_LOG',
        SERVER_USECASE_LOG: 'SERVER_USECASE_LOG',

        // ui log.
        BT_UI_LOG: 'BT_UI_LOG',
        HOME_UI_LOG: 'HOME_UI_LOG',
        PROFILE_UI_LOG: 'PROFILE_UI_LOG',
        ROOT_UI_LOG: 'ROOT_UI_LOG',
        SETTINGS_UI_LOG: 'SETTINGS_UI_LOG',
        SPLASH_UI_LOG: 'SPLASH_UI_LOG',

        // test log.
        REPO_TEST_LOG: 'REPO_TEST_LOG',
        UI_TEST_LOG: 'UI_TEST_LOG',
        SOURCE_TEST_LOG: 'SOURCE_TEST_LOG',
        USECASE_TEST_LOG: 'USECASE_TEST_LOG',

        // storage util.
        STORAGE_LOG_TAG: 'STORAGE_LOG',

        // ble util.
        BLE_UTIL_LOG_TAG: 'BLE_UTIL_LOG_TAG',
    },
    STORAGE: {
        KEY_PROFILE_NAME: 'KEY_PROFILE_NAME',
        KEY_BLE_DEVICE_MAC_ADDRESS: 'KEY_BLE_DEVICE_MAC_ADDRESS',
        KEY_BLE_DEVICE_NAME: 'KEY_BLE_DEVICE_NAME',
    }
};
