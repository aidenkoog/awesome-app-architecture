import Constants from '../../../utils/Constants';
import { logDebug } from '../../../utils/logger/Logger';
import { navigateToNextScreen } from '../../../utils/navigation/NavigationUtil';
import { showToast } from '../../../utils/toast/ToastUtil';
import HiddenHomeComponent from './HiddenHomeComponent';

const LOG_TAG = Constants.LOG.HOME_UI_LOG;

/**
 * navigation related constants.
 */
const HIDDEN_BLUETOOTH_SCREEN = Constants.SCREEN.HIDDEN.BLUETOOTH;
const NAVIGATION_NO_DELAY_TIME = Constants.NAVIGATION.NO_DELAY_TIME;
const NAVIGATION_PURPOSE_NORMAL = Constants.NAVIGATION.PURPOSE.NORMAL;

/**
 * hidden home main screen.
 * @param {any} navigation
 * @return {JSX.Element}
 */
function HiddenHomeContainer({ navigation }: any) {
  /**
   * handle event occurred when pressing test case tile.
   */
  const onPressTestCategory = (itemId: string) => {
    logDebug(LOG_TAG, '<<< pressed category item id: ' + itemId);

    switch (itemId) {
      case 't1':
        navigateToNextScreen(
          navigation,
          HIDDEN_BLUETOOTH_SCREEN,
          NAVIGATION_NO_DELAY_TIME,
          NAVIGATION_PURPOSE_NORMAL,
        );
        break;

      case 't2':
      case 't3':
      case 't4':
        showToast('Not supported yet!');
        logDebug(LOG_TAG, 'Not supported yet!');
        break;
    }
  };

  return <HiddenHomeComponent onPressTestCategory={onPressTestCategory} />;
}

export default HiddenHomeContainer;
