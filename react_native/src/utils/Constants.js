export default {
    ROOT: {
        // location: src/presentation/containers/root/RootContainer.js
        APP_EVENT_TYPE: 'change',
        APP_ACTIVE: 'active',
        APP_BACKGROUND: 'background',
    },
    COMMON: {
        DEFAULT_DATA: '',
        DEFAULT_STATE: false,
        DEFAULT_LIST_STATE: [],
    },
    LOG: {
        // repository log
        BT_REPO_LOG: 'bt_repo_log',
        COMMON_REPO_LOG: 'common_repo_log',
        PLATFORM_REPO_LOG: 'platform_repo_log',
        SERVER_REPO_LOG: 'server_repo_log',

        // usecase log
        BT_USECASE_LOG: 'bt_usecase_log',
        COMMON_USECASE_LOG: 'common_usecase_log',
        PLATFORM_USECASE_LOG: 'platform_usecase_log',
        SERVER_USECASE_LOG: 'server_usecase_log',

        // ui log
        BT_UI_LOG: 'bt_ui_log',
        HOME_UI_LOG: 'home_ui_log',
        PROFILE_UI_LOG: 'profile_ui_log',
        ROOT_UI_LOG: 'root_ui_log',
        SETTINGS_UI_LOG: 'settings_ui_log',
        SPLASH_UI_LOG: 'splash_ui_log',

        // test log
        REPO_TEST_LOG: 'repo_test_log',
        UI_TEST_LOG: 'ui_test_log',
        SOURCE_TEST_LOG: 'source_test_log',
        USECASE_TEST_LOG: 'usecase_test_log'
    }
};
