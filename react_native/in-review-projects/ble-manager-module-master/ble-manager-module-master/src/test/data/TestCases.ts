import TestCase from '../../domain/entities/test/TestCase'
import TestCategory from '../../domain/entities/test/TestCategory'

export const TEST_CATEGORY_LIST = [
    new TestCategory('t1', 'Bluetooth', '#ffff40'),
    new TestCategory('t2', 'Platform', '#ff2240'),
    new TestCategory('t3', 'Common', '#22cf40'),
    new TestCategory('t4', 'Server', '#bbff40'),
    new TestCategory('t5', 'Testcase', '#868e96'),
    new TestCategory('t6', 'Testcase', '#868e96'),
    new TestCategory('t7', 'Testcase', '#868e96'),
    new TestCategory('t8', 'Testcase', '#868e96'),
]

export const BT_TEST_CASE_LIST = [
    new TestCase('bt_t00', "Clear", "343a66"),
    new TestCase('bt_t01', "Auto Test", "343a66"),
    new TestCase('bt_t0', "Information", "343a40"),
    new TestCase('bt_t1', "Authenticate", "343a40"),
    new TestCase('bt_t2', "Sync", "343a40"),
    new TestCase('bt_t3', "Disconnect", "343a40"),
    new TestCase('bt_t4', "Upgrade FW", "343a40"),
    new TestCase('bt_t5', "Battery Level", "343a40"),
    new TestCase('bt_t6', "Reconnect BLE", "343a40"),
    new TestCase('bt_t7', "Send Log", "343a40"),
    new TestCase('bt_t8', "Send Message", "343a40"),
    new TestCase('bt_t9', "Set MTU", "343a40"),
    new TestCase('bt_t10', "Start Scan", "343a40"),
    new TestCase('bt_t11', "En/Disable Log", "343a40"),
    new TestCase('bt_t12', "BT Testcase", "343a40"),
    new TestCase('bt_t13', "BT Testcase", "343a40"),
]

export const PLATFORM_TEST_CASE_LIST = [
    new TestCase('p_t1', "", "343a40"),
]

export const COMMON_TEST_CASE_LIST = [
    new TestCase('c_t1', "", "343a40"),
]