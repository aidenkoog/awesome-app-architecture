import { StyleSheet } from 'react-native';

/**
 * declared stylesheet globally.
 * components can use it.
 */
export default StyleSheet.create(
  {
    // root
    root_container: {
      flex: 1,
      alignSelf: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    root_text: {
      color: '#000000',
      alignSelf: 'center',
    },

    // splash
    splash_container: {
      flex: 1,
      alignSelf: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#000000',
    },
    splash_text: {
      fontSize: 20,
      fontWeight: 'bold',
    },

    // settings
    settings_container: {},

    // qr scan
    qr_scan_container: {},

    // profile
    profile_container: {},

    // home
    home_container: {},

    // bluetooth
    bluetooth_container: {},
  }
);
