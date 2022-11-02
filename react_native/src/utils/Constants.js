export default {
    SCREEN: {
        SPLASH: "Splash",
        PROFILE: "Profile",
        QR_SCAN: "QrScan",
        BLUETOOTH: "Bluetooth",
        HOME: "Home",
        SW_UPDATE: "SwUpdate",
        EDIT_PROFILE: "EditProfile",
        HIDDEN: {
            SPLASH: "HiddenSplash",
            HOME: "HiddenHome",
            BLUETOOTH: "HiddenBluetooth",
            COMMON: "HiddenCommon",
            PLATFORM: "HiddenPlatform",
            SERVER: "HiddenServer"
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
        DEFAULT_INT_VALUE: 0,
        DEFAULT_LIST_STATE: [],
        SAVE_PROFILE_SUCCESS: true,
        SAVE_PROFILE_FAILURE: false,
    },
    BT: {
        SCAN_DURATION: 3,
        SCAN_DELAY_TIME: 1500,
        BT_PERMISSION_ACCEPTED: true,
        BT_PERMISSION_REJECTED: false,
        NEXT_SCREEN_DELAY_TIME: 1000
    },
    SPLASH: {
        SPLASH_LOADING_TIME: 2000,
    },
    LOG: {
        // ble manager log.
        BT_BLE_MANAGER: 'BT_BLE_MANAGER',

        // repository log.
        BT_REPO_LOG: 'BT_REPO_LOG',
        COMMON_REPO_LOG: 'COMMON_REPO_LOG',
        PLATFORM_REPO_LOG: 'PLATFORM_REPO_LOG',
        SERVER_REPO_LOG: 'SERVER_REPO_LOG',

        // ble request message.
        HEADER_BT_REQ_AGE: 'HEADER_BT_REQ_AGE',
        HEADER_BT_REQ_CMD: 'HEADER_BT_REQ_CMD',
        HEADER_BT_REQ_DATE: 'HEADER_BT_REQ_DATE',
        HEADER_BT_REQ_FW_VERSION: 'HEADER_BT_REQ_FW_VERSION',
        HEADER_BT_REQ_GENDER: 'HEADER_BT_REQ_GENDER',
        HEADER_BT_REQ_HEIGHT: 'HEADER_BT_REQ_HEIGHT',
        HEADER_BT_REQ_MSG_ID: 'HEADER_BT_REQ_MSG_ID',
        HEADER_BT_REQ_PAYLOAD_LENGTH: "HEADER_BT_REQ_PAYLOAD_LENGTH",
        HEADER_BT_REQ_REMINDER: "HEADER_BT_REQ_REMINDER",
        HEADER_BT_REQ_RET: "HEADER_BT_REQ_RET",
        HEADER_BT_REQ_SEQUENCE: "HEADER_BT_REQ_SEQUENCE",
        HEADER_BT_REQ_SERIAL: "HEADER_BT_REQ_SERIAL",
        HEADER_BT_REQ_SOURCE_IP: "HEADER_BT_REQ_SOURCE_IP",
        HEADER_BT_REQ_STATUS: "HEADER_BT_REQ_STATUS",
        HEADER_BT_REQ_VERSION: "HEADER_BT_REQ_VERSION",
        HEADER_BT_REQ_WEIGHT: "HEADER_BT_REQ_WEIGHT",

        // usecase log.
        BT_USECASE_LOG: 'BT_USECASE_LOG',
        COMMON_USECASE_LOG: 'COMMON_USECASE_LOG',
        PLATFORM_USECASE_LOG: 'PLATFORM_USECASE_LOG',
        SERVER_USECASE_LOG: 'SERVER_USECASE_LOG',

        // ui log.
        BT_UI_LOG: 'BT_UI_LOG',
        HOME_UI_LOG: 'HOME_UI_LOG',
        PROFILE_UI_LOG: 'PROFILE_UI_LOG',
        QR_SCAN: 'QR_SCAN',
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
        BLE_FEATURE_UTIL_LOG_TAG: 'BLE_FEATURE_UTIL_LOG_TAG',
        BLE_ENCRYPTION_UTIL_LOG_TAG: 'BLE_ENCRYPTION_UTIL_LOG_TAG',

        // permisstion util.
        PERMISSION_LOG_TAG: "PERMISSION_LOG_TAG",
    },
    STORAGE: {
        KEY_PROFILE_NAME: "KEY_PROFILE_NAME",
        KEY_PROFILE_IMAGE_URL: "KEY_PROFILE_IMAGE_URL",
        KEY_PROFILE_GENDER: "KEY_PROFILE_GENDER",
        KEY_PROFILE_BIRTHDAY: "'KEY_PROFILE_BIRTHDAY",
        KEY_PROFILE_HEIGHT: "KEY_PROFILE_HEIGHT",
        KEY_PROFILE_WEIGHT: "KEY_PROFILE_WEIGHT",

        KEY_BLE_DEVICE_MAC_ADDRESS: 'KEY_BLE_DEVICE_MAC_ADDRESS',
        KEY_BLE_DEVICE_NAME: 'KEY_BLE_DEVICE_NAME',
        KEY_DEVICE_REGISTRATION_FLAG: 'KEY_DEVICE_REGISTRATION_FLAG',
    }
};
