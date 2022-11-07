import { Colors } from '../../utils/theme'
import { Platform, TouchableHighlight, TouchableOpacity } from 'react-native'

const TouchableAndroid = (props) => (
  <TouchableHighlight
    activeOpacity={0.7}
    underlayColor={Colors.transparent}
    {...props} />
)

export default Platform.OS === 'ios' ? TouchableOpacity : TouchableAndroid