import TestCase from '../../domain/entities/test/TestCase.js'
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
    new TestCase('bt_t0', "Information", "343a40"),
    new TestCase('bt_t1', "Authenticate", "343a40"),
    new TestCase('bt_t2', "Sync", "343a40"),
    new TestCase('bt_t3', "Disconnect", "343a40"),
    new TestCase('bt_t4', "Upgrade FW", "343a40"),
    new TestCase('bt_t5', "Battery Level", "343a40"),
    new TestCase('bt_t6', "Device Info", "343a40"),
    new TestCase('bt_t7', "Send Log", "343a40"),
    new TestCase('bt_t8', "Send Message", "343a40"),
    new TestCase('bt_t9', "Set MTU", "343a40"),
    new TestCase('bt_t10', "Start Scan", "343a40"),
    new TestCase('bt_t11', "BT Testcase", "343a40"),
    new TestCase('bt_t12', "BT Testcase", "343a40"),
    new TestCase('bt_t13', "BT Testcase", "343a40"),
]

export const PLATFORM_TEST_CASE_LIST = [
    new TestCase('p_t1', "Send SMS", "343a40"),
    new TestCase('p_t2', "Send DirectSMS", "343a40"),
    new TestCase('p_t3', "Call", "343a40"),
    new TestCase('p_t4', "DirectCall", "343a40"),
    new TestCase('p_t5', "My PhoneNumber", "343a40"),
    new TestCase('p_t6', "Write Email", "343a40"),
    new TestCase('p_t7', "Show WebUrl", "343a40"),
    new TestCase('p_t8', "App PackageName", "343a40"),
    new TestCase('p_t9', "Serial Number", "343a40"),
    new TestCase('p_t10', "Device UUID", "343a40"),
    new TestCase('p_t11', "Device Name", "343a40"),
]

export const COMMON_TEST_CASE_LIST = [
    new TestCase('c_t1', "Profile Info", "343a40"),
    new TestCase('c_t2', "Device Registration", "343a40"),
]