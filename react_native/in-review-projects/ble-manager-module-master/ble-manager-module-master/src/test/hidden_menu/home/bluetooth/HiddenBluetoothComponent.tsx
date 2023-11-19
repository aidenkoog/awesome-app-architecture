import { View, FlatList, StyleSheet, Text, TextInput, Platform } from 'react-native';
import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist';
import Dialog from 'react-native-dialog';
import TestCaseButton from '../../../../presentation/components/hidden/TestCaseButton';
import { BT_TEST_CASE_LIST } from '../../../data/TestCases';

const DIALOG_TITLE = '[ Enter Device Information ]';

/**
 * component ui that is used in container.
 * @param {any} props
 * @return {JSX.Element}
 */
export default function HiddenBluetoothComponent(props: any): JSX.Element {
  /**
   * props delivered from HiddenBluetoothContainer.
   */
  const {
    onPressTestCase,
    logMessages,
    handleOkPopup,
    handleCancelPopup,
    onDeviceNameChanged,
    onDeviceMacAddressChanged,
    okButtonDisable,
    nameErrorHintMessage,
    macAddressErrorHintMessage,
    popupVisible,
  } = props;

  /**
   * render test category items.
   * @param {any} itemData
   * @return
   */
  function renderFlatListItem(itemData: any) {
    function pressHandler() {
      onPressTestCase(itemData.item.id);
    }
    return (
      <TestCaseButton
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flexDirection: 'column' }}>
        <FlatList
          data={BT_TEST_CASE_LIST}
          keyExtractor={item => item.id}
          renderItem={renderFlatListItem}
          numColumns={1}
        />
      </View>

      <View
        style={{ flex: 1, flexDirection: 'column', backgroundColor: '#000000' }}>
        <AutoScrollFlatList
          data={logMessages}
          renderItem={(itemData: any) => {
            return (
              <View style={styles.logItem}>
                <Text
                  style={
                    itemData.item.text.indexOf('>>>') >= 0
                      ? styles.requestLogText
                      : itemData.item.text.indexOf('!!!') >= 0
                        ? styles.responseErrorLogText
                        : itemData.item.text.indexOf('[ ') >= 0
                          ? styles.responseLogTitleText
                          : styles.responseLogText
                  }>
                  {itemData.item.text}{' '}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item: any, _index: number) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>

      <Dialog.Container visible={popupVisible}>
        <Dialog.Title>{DIALOG_TITLE}</Dialog.Title>
        <View style={{ flexDirection: 'column' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text>1. Name : </Text>
            <TextInput
              editable={true}
              maxLength={15}
              keyboardType="numeric"
              onChangeText={value => onDeviceNameChanged(value)}
              style={{
                flex: 1,
                fontSize: 14,
                alignItems: 'center',
                backgroundColor: '#000000',
                color: '#ffff00',
              }}
            />
          </View>
          <Text style={{ color: '#cc3340', fontWeight: 'bold' }}>
            {nameErrorHintMessage}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text>2. MAC Address : </Text>
            <TextInput
              editable={true}
              maxLength={12}
              keyboardType="numeric"
              onChangeText={value => onDeviceMacAddressChanged(value)}
              style={{
                flex: 1,
                fontSize: 14,
                alignItems: 'center',
                backgroundColor: '#000000',
                color: '#ffff00',
              }}
            />
          </View>
          <Text style={{ color: '#cc3340', fontWeight: 'bold' }}>
            {macAddressErrorHintMessage}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Dialog.Button
              style={styles.popupButton}
              label="Cancel"
              onPress={handleCancelPopup}></Dialog.Button>

            <Dialog.Button
              style={styles.popupButton}
              disabled={okButtonDisable}
              label="OK"
              onPress={handleOkPopup}></Dialog.Button>
          </View>
        </View>
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  logItem: {
    margin: 3,
    alignSelf: 'stretch',
    textAlign: 'left',
    padding: 3,
    borderRadius: 6,
    backgroundColor: '#000000',
  },
  requestLogText: {
    color: '#ffff00',
    alignSelf: 'stretch',
    textAlign: 'left',
    fontSize: 15,
  },
  responseLogText: {
    color: '#bbff40',
    alignSelf: 'stretch',
    textAlign: 'left',
  },
  responseLogTitleText: {
    color: '#11ffbb',
    alignSelf: 'stretch',
    textAlign: 'left',
  },
  responseErrorLogText: {
    color: '#ff0000',
    alignSelf: 'stretch',
    textAlign: 'left',
  },
  popupButton: {
    margin: 10,
    width: 80,
    color: '#cc3340',
    fontWeight: 'bold',
    borderRadius: 3,
    elevation: 20,
    backgroundColor: 'white',
    shadowColor: 'red',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 15,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
});
