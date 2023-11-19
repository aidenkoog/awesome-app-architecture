import {VLCPlayer} from 'react-native-vlc-media-player';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {MEDIA_URL} from '../../data/dummy/RtspDummyUrl';

export const HomeComponent = () => {
  const calcVLCPlayerHeight = (windowWidth, aspetRatio) => {
    return windowWidth * aspetRatio;
  };

  return (
    <View style={styles.home__container}>
      <Text style={styles.home__title}>AidenKooG's RTSP Player</Text>
      <VLCPlayer
        source={{
          initType: 2,
          hwDecoderEnabled: 1,
          hwDecoderForced: 1,
          uri: MEDIA_URL.RTSP_BIG_BUCK_BUNNY,
          initOptions: [
            '--no-audio',
            '--rtsp-tcp',
            '--network-caching=150',
            '--rtsp-caching=150',
            '--no-stats',
            '--tcp-caching=150',
            '--realrtsp-caching=150',
          ],
        }}
        autoplay={true}
        autoAspectRatio={true}
        resizeMode="cover"
        // videoAspectRatio={"4:3"}
        isLive={true}
        autoReloadLive={true}
        style={{
          height: calcVLCPlayerHeight(Dimensions.get('window').width, 3 / 4),
          marginTop: 30,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  home__title: {
    color: '#000000',
    width: '100%',
    height: 50,
    fontWeight: 'bold',
  },
  home__container: {
    backgroundColor: '#ffffff',
    padding: 30,
  },
});
